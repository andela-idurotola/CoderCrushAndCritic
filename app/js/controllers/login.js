angular.module('ccac.controllers')
  .controller('LoginCtrl', ['$scope', '$http', 'Authentication', '$state', function ($scope, $http, Authentication, $state) {

    $scope.login = function() {
      Authentication.login(function(data) {
        if(data) $state.go('home');
      });
    };

    $scope.googleSignUp = function() {
      Authentication.login(function(data) {
        if(data) $state.go('playground');
      });
    };
  }
]);