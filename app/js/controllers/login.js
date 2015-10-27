angular.module('ccac.controllers')
  .controller('LoginCtrl', ['$scope', '$http', 'Authentication', function ($scope, $http, Authentication) {

    $scope.login = function() {
      Authentication.login(function(data) {
        console.log('came back with the user data from google',data);
      });
    };

    $scope.googleSignUp = function() {
      Authentication.login(function(data) {
        console.log('came back with the user data from google',data);
      });
    };
  }
]);