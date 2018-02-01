myApp.controller('ShelfController', ['UserService', function(UserService) {
  console.log('ShelfController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
