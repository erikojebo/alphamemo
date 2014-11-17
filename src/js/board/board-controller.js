angular.module("alphamemo").controller("boardController", function ($scope, $routeParams, $timeout) {

    function parseGameConfiguration() {
        var boardSize = $routeParams.boardSize;
        var gameType = $routeParams.gameType;

        var parts = boardSize.split('x');
        var rowCount = parseInt(parts[0]);
        var columnCount = parseInt(parts[1]);

        return {
            gameType: gameType,
            rowCount: rowCount,
            columnCount: columnCount,
            totalTileCount: function () {
                return rowCount * columnCount;
            }
        };
    }

    var gameConfig = parseGameConfiguration();

    $scope.board = memo.viewModels.board.create(gameConfig, $timeout);
});
