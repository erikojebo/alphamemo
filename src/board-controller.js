angular.module("alphamemo").controller("boardController", function ($scope) {

    var tiles = [{
        value: 'A'
    },{
        value: 'B'
    },{
        value: 'A'
    },{
        value: 'B'
    },{
        value: 'C'
    },{
        value: 'C'
    }];

    $scope.tiles = tiles;
});
