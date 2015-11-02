angular.module('ccac.controllers')
  .controller('PlaygroundCtrl', ['$scope', '$http','MockData', function ($scope, $http, MockData) {

    $scope.display = {
      vote: false,
      create: false,
      nominate: false
    };

    $scope.openDrawer = function(drawer) {
      $scope.display[drawer] = !$scope.display[drawer];
    };

    $scope.isSelected = function(drawer) {
      return $scope.display[drawer];
    };

    var options = {
      align:      'center',
      offset:     0,
      direction:  'right',
      autoResize: true,
      comparator: null,
      itemWidth:  "19%", // initally i had 20% here and it worked perfectly. check later to see the error that was there
      container:  $('#myElementContainer'),
      outerOffset: 0,
      resizeDelay: 50,
      fillEmptySpace: true,
      verticalOffset: 0,
      flexibleWidth:  true,
      possibleFilters: [],
      onLayoutChanged: undefined,
      ignoreInactiveItems: true
    };

    imagesLoaded('#myElementContainer', function () {
      setTimeout(function() {
        var wookmark = new Wookmark('#myElementContainer',options);
      },500);
    });

    
    $scope.nominations = [];
    var initalizeNominations = function() {
      MockData.nominations(function(data) {
        _.forEach(data, function(nomination) {
          $scope.nominations.push(nomination);
        });
      });
    }();
  }
]);
