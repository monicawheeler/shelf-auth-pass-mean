myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  console.log('UserService Loaded');
  
  var self = this;

  self.userObject = {};

  // ask the server if this user is logged in
  self.getuser = function () {
    $http.get('/api/user')
      .then(function (response) {
        if (response.data.username) {
          // user has a curret session on the server
          self.userObject.username = response.data.username;
          self.userObject._id = response.data._id;
          self.userObject.shelfItem = response.data.shelfItem;
          console.log('User Data: ', self.userObject);
        } else {
          // unlikely to get here, but if we do, bounce them back to the login page
          $location.path("/shelf");
        }
      },
      // error response of unauthorized (403)
      function(response) {
        // user has no session, bounce them back to the login page
        $location.path("/shelf");
      });
  } 
  self.shelfADdog = function (newDdog) {
    console.log('ddog clickin');
    $http.post(`/api/user/ddogger/${self.userObject._id}`, newDdog) 
    .then(function (response) {
        console.log('successful post response' , response);
    })
    .catch(function (error) {
        console.log('error on post response' , error);
    }); 
}
  self.logout = function () {
    $http.get('/api/user/logout')
      .then(function (response) {
        console.log('logged out');
        $location.path("/shelf");
      },
    function(response) {
      console.log('logged out error');
      $location.path("/shelf");
    });
  }
}]);
