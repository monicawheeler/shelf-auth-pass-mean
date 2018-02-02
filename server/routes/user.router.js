const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person').Person;
const Item = require('../models/Person').Item;
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});


// Handles Ajax request for user information if user is authenticated
router.get('/images', (req, res) => {
  console.log('images get');
  
  Item.find({}, (error, shelfList) => {
      if(error) {
          console.log('error on find:', error);
          res.sendStatus(500);
      } else {
          console.log('found shelf documents', shelfList);
          res.send(shelfList);
      }
  });
});

// Get user specific images
router.get('/images/:id', (req, res) => {
  console.log('images get');
  let personId = req.params.id;
  
  Person.findById({_id: personId}).populate('shelfItem').exec( (error, shelfList) => {
      if(error) {
          console.log('error on find:', error);
          res.sendStatus(500);
      } else {
          console.log('found shelf documents', shelfList);
          res.send(shelfList);
      }
    }); // end find
}); // end route


// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const newPerson = new Person({ username, password });
  newPerson.save()
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// Add a new ddogger
router.post('/ddogger/:id', (req, res) => {

  console.log('in ddoggers route', req.body);
  console.log('params', req.params);

  if(req.isAuthenticated()) {
    let newDdog = new Item(req.body);
    newDdog.save((error, itemDoc) => {
      if(error) {
        res.sendStatus(500);
      } else {
        console.log('saved new itemDoc', itemDoc);
        
        Person.findByIdAndUpdate(
          {
              "_id": req.params.id
          },
          // push this new object into the array on this Game Document
          { $push: { shelfItem: newDdog } },
          (pusherror, doc) => {
              if (pusherror) {
                  console.log('error on push to shelf array: ', pusherror);
                  res.sendStatus(500);
              } else {
                  console.log('updated person Document: ', doc);
                  console.log('-----------------------------');

                  res.sendStatus(201);
              }
          }
        );
      }
    })

  }// end of authentication

  else {
    res.sendStatus(403);
  }

});// end of ddogger post


router.delete('/ddogger/:id', (req, res) => {
  let imageId = req.params.id;
  Item.findByIdAndRemove(
      {"_id": imageId},
      // function(error, removed) 
      (error, removedDocument) => {
          if (error) {
              console.log('error on remove: ', error);
              res.sendStatus(500);
          } else {
              console.log('Document we removed: ', removedDocument);
              res.sendStatus(200);
          }
      }
  )

});

module.exports = router;
