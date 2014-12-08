angular.module("alphamemo").controller("boardController", function ($scope, $routeParams, $timeout, $location) {

    function parseGameConfiguration() {
        var boardSize = $routeParams.boardSize;
        var gameType = $routeParams.gameType;

        var parts = boardSize.split('x');
        var rowCount = parseInt(parts[0]);
        var columnCount = parseInt(parts[1]);

        var queryStringParams = $location.search();
        
        return {
            gameType: gameType,
            rowCount: rowCount,
            columnCount: columnCount,
            revealBoard: queryStringParams.reveal,
            totalTileCount: function () {
                return rowCount * columnCount;
            }
        };
    }

    function resetBoard() {
        $scope.board = memo.viewModels.board.create(gameConfig, $timeout);
    }

    var gameConfig = parseGameConfiguration();

    $scope.resetBoard = resetBoard;

    resetBoard();
});
