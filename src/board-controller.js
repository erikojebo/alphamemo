angular.module("alphamemo").controller("boardController", function ($scope, $routeParams) {

    function createTileViewModel(rowIndex, columnIndex) {
        var cell = {
            value: String.fromCharCode(65 + (rowIndex % (rowCount * columnCount / 2))),
            isFlipped: false
        };

        cell.flip = function () {
            cell.isFlipped = true;
        };
        
        return cell;
    }

    var tiles = [];

    var boardSize = $routeParams.tileCount;
    var parts = boardSize.split('x');
    var rowCount = parts[0];
    var columnCount = parts[1];

    var tileRows = [];

    for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        var row = [];

        for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {

            var cell = createTileViewModel(rowIndex, columnIndex);
            row.push(cell);
        }

        tileRows.push(row);
    }

    $scope.tileRows = tileRows;
});
