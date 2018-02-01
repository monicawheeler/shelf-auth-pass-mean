myApp.controller('ShelfController', ['UserService', function(UserService) {
  console.log('ShelfController created');
  var self = this;
  self.userService = UserService;
  self.user = UserService.userObject;
  console.log(self.user);
  

  self.shelfADdog = function (userId, newDdog) {
    console.log('ddogin aint easily clicked', userId);
    UserService.shelfADdog(userId, newDdog);
  }

}]);
