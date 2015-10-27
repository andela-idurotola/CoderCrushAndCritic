angular.module('ccac.controllers', []);
angular.module('ccac.directives', []);
angular.module('ccac.services', ['firebase','ngCookies']);
angular.module('ccac.filters', []);

window.CCAC = angular.module('CCAC', [
  'ngRoute',
  'ui.router',
  'ngMaterial',
  'angular-storage',
  'ccac.controllers',
  'ccac.directives',
  'ccac.services',
  'ccac.filters'
]);

CCAC.run(['$rootScope', '$state', '$http', 'Authentication', '$location', 
  function($rootScope, $state, $http, Authentication, $location) {

    Authentication.isAuthenticated(function(err, user) { 
      if(err) {
        event.preventDefault();
        $location.path('/login');
      }
      else {
        $rootScope.currentUser = user;
      }                                                                                                                                                                                                     
    });
  }
]);

CCAC.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/templates/home.html',
        controller: 'mainCtrl'
      })
      .state('playground', {
        url: '/',
        templateUrl: 'views/templates/playground.html',
        controller: 'PlaygroundCtrl'      
      })
      .state('error_404', {
        url: '/error_404',
        templateUrl: 'views/error_404.html'
      });  
  }
]);