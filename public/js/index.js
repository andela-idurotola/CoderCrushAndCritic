angular.module('ccac.controllers', []);
angular.module('ccac.directives', []);
angular.module('ccac.services', []);
angular.module('ccac.filters', []);

window.CCAC = angular.module('ccac', [
  'ngRoute',
  'ui.router',
  // 'lumx',
  'ngMaterial',
  'ccac.controllers',
  'ccac.directives',
  'ccac.services',
  'ccac.filters'
]);

window.CCAC.run(['$rootScope', function ($rootScope) {
  // $rootScope._ = window._;
  // $rootScope.moment = window.moment; 
  // console.log('rootscope');
}]);

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

angular.module('ccac.controllers')
  .controller('playgroundController', ['$scope', '$http', function ($scope, $http) {

    $scope.display = {
      nominateForm: false,
      createForm: false,
      voteForm: false
    };

    $scope.toggleSideNav = function(option) { 
      $scope.display[option] = !$scope.display[option];
      $scope.sideNavHasFocus =  _.contains(_.values($scope.display),true);
      animateSideNav($scope.sideNavHasFocus);
    };

    var animateSideNav = function(open) {
      var sideNav = $(document.getElementsByClassName('side-nav-veiw'));
      if(open) sideNav.animate({ 'min-width' : 650}, 500);
      else sideNav.animate({ 'min-width' : 100}, 500);
    };
}]);
