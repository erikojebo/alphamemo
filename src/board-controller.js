angular.module("alphamemo").controller("boardController", function ($scope, $routeParams) {

    function createTileValues(gameType, tileCount) {
        var values = [];

        for (var i = 0; i < tileCount / 2; i++) {
            values.push({
                value1: 'A' + i,
                value2: 'A' + i
            });
        }
        
        return values;
    }

    function createTileViewModel(value) {
        var cell = {
            value: value,
            isFlipped: false
        };

        cell.flip = function () {
            cell.isFlipped = true;
        };
        
        return cell;
    }

    var tiles = [];

    var boardSize = $routeParams.boardSize;
    var gameType = $routeParams.gameType;

    var parts = boardSize.split('x');
    var rowCount = parts[0];
    var columnCount = parts[1];

    var tileValuePairs = createTileValues(gameType, rowCount * columnCount);
    var tileViewModels = [];

    for (var pairIndex = 0; pairIndex < tileValuePairs.length; pairIndex++) {
        tileViewModels.push(createTileViewModel(tileValuePairs[pairIndex].value1));
        tileViewModels.push(createTileViewModel(tileValuePairs[pairIndex].value2));
    }

    tileViewModels = _.shuffle(tileViewModels);

    var tileRows = [];

    function createRow(rowIndex) {
        var row = [];

        for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            var tileIndex = rowIndex * rowCount + columnIndex;
            row.push(tileViewModels[tileIndex]);
        }

        return row;
    }

    for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        tileRows.push(createRow(rowIndex));
    }

    $scope.tileRows = tileRows;
});
