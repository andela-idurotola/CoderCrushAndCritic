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