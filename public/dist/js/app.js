angular.module('garion', ['ngRoute','ngSanitize','angular-data.DS'])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'html/indexController.html',
    controller: 'IndexController',
    controllerAs: 'IdxCtrl'
  });
}]);

angular.module('garion').controller('IndexController', [function() {
  console.log('got here');
}]);
