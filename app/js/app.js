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