angular.module('ccac.service', []);
angular.module('ccac.filter', []);
angular.module('ccac.controller', []);
angular.module('ccac.directive', []);

window.CCAC = angular.module('ccac', [
  'ngRoute',
  'ui.router',
  // 'lumx',
  'ngMaterial'
]);

CCAC.run(function() {

});

CCAC.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'views/templates/home.html',
        controller: 'mainController'
    })
    .state('playground', {
      url: '/',
      templateUrl: 'views/templates/playground.html',
      controller: 'playgroundController'      
    })
    .state('error_404', {
      url: '/error_404',
      templateUrl: 'views/error_404.html'
    });    
});
angular.module('ccac')
  .controller('mainController', function($scope, $http) {
    $scope.formData = {};
    $scope.todoData = {};
    console.log('THIS WAS CALLED !');

    // Get all todos
    $http.get('api/v1/todos').success(function(data) {
      $scope.todoData = data;
      console.log('todo data is ;',$scope.todoData);
    }).error(function(err) {
      console.log('ERROR : ' + err);
    });

    // Create a new todo
    $scope.createTodo = function() { 
      $http.post('api/v1/todos', $scope.formData).success(function(data) {
        $scope.formData = {};
        $scope.todoData = data;
        console.log(data);
      }).error(function(error) {
        console.log('Error: ' + error);
      });
    };

    // Delete a todo
    $scope.deleteTodo = function(todoID) {
      $http.delete('api/v1/todos/' + todoID).success(function(data) {
        $scope.todoData = data;
        console.log(data);
      }).error(function(data) {
        console.log('Error: ' + data);
      });
    };
});

angular.module('ccac')
  .controller('playgroundController', function($scope, $http) {

    console.log('THIS IS PLAYGROUND THANKS !');
});
