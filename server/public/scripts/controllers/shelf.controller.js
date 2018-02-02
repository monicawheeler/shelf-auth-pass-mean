myApp.controller('ShelfController', ['UserService', function(UserService) {
  console.log('ShelfController created');
  var self = this;
  self.userService = UserService;
  self.user = UserService.userObject;
  self.shelfList = UserService.shelfList;
  self.userImageList = UserService.userImageList;
  
  console.log(self.user);
  

  self.shelfADdog = function (userId, newDdog) {
    console.log('ddogin aint easily clicked', userId);
    UserService.shelfADdog(userId, newDdog);
  }

  self.deleteUserImage = function (imageId) {
    console.log('delete button', imageId);
    UserService.deleteUserImage(imageId);
  }


}]);
