angular.module('ccac.controllers')
  .controller('PlaygroundCtrl', ['$scope', '$http','MockData', function ($scope, $http, MockData) {


    var options = {
      align: 'center',
      autoResize: true,
      comparator: null,
      container: $('.playground-view'),
      direction: 'right',
      ignoreInactiveItems: true,
      itemWidth: "25%",
      fillEmptySpace: true,
      flexibleWidth: true,
      offset: 0,
      onLayoutChanged: undefined,
      outerOffset: 0,
      possibleFilters: [],
      resizeDelay: 50,
      verticalOffset: 0
    };

    imagesLoaded('#myElementContainer', function () {
      var wookmark = new Wookmark('#myElementContainer',options);
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
