angular.module("alphamemo").controller("menuController", function ($scope) {
    $scope.tileCount = 0;

    $scope.tileSetups = [{
        imageSource: "images/small_board.png",
        tileCount: 6
    }, {
        imageSource: "images/medium_board.png",
        tileCount: 12
    }, {
        imageSource: "images/large_board.png",
        tileCount: 20
    }];
    
    $scope.selectTileSetup = function (tileSetup) {
        $scope.tileCount = tileSetup.tileCount;

        for (var i = 0; i < $scope.tileSetups.length; i++) {
            $scope.tileSetups[i].isSelected = false;
        }

        tileSetup.isSelected = true;
    };
});
