angular.module('ccac.controllers')
  .controller('LoginCtrl', ['$scope', '$http', 'Authentication', '$state', function ($scope, $http, Authentication, $state) {

    $scope.login = function() {
      $http.post('api/v1/login', $scope.credentials).success(function() {

      }).error(function(err) {

      });
    };

    $scope.googleSignUp = function() {
      Authentication.login(function(data) {
        if(data) {
          Authentication.auth(data);
        }
      });
    };

    // add this to the jade template to allow passwords.
    $scope.signUp = function() {
      Authentication.auth($scope.signup);
    };
  }
]);