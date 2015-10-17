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
