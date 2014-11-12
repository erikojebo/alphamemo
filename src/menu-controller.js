angular.module("alphamemo").controller("menuController", function ($scope) {

    function range(length) {
        var values = [];

        for (var i = 0; i < length; i++) {
            values.push(i);
        }
        
        return values;
    }

    function createTileSetupViewModel (rowCount, columnCount) {
        return {
            rows: range(rowCount),
            columns: range(columnCount),
            sizeIdentifier: rowCount + 'x' + columnCount
        };
    }

    $scope.tileCount = 0;

    $scope.tileSetups = [
        createTileSetupViewModel(3,2),
        createTileSetupViewModel(4,3),
        createTileSetupViewModel(5,4)
    ];
    
    $scope.selectTileSetup = function (tileSetup) {
        $scope.sizeIdentifier = tileSetup.sizeIdentifier;

        for (var i = 0; i < $scope.tileSetups.length; i++) {
            $scope.tileSetups[i].isSelected = false;
        }

        tileSetup.isSelected = true;
    };
});
