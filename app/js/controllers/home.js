angular.module('ccac.controllers')
  .controller('mainController',['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};
    $scope.todoData = {};
    console.log('THIS WAS CALLED !');

    // Get all todos
    $http.get('api/v1/todos').success(function(data) {
      $scope.todoData = data;
      console.log('TODO DATA :',$scope.todoData);
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
}]);
