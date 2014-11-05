angular.module("alphamemo").controller("boardController", function ($scope, $routeParams) {

    var tiles = [];

    var tileCount = $routeParams.tileCount;

    for (var i = 0; i < tileCount; i++) {
        tiles.push({
            value: String.fromCharCode(65 + (i % (tileCount / 2)))
        });
    }

    $scope.tiles = tiles;
});
