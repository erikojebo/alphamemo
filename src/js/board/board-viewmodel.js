memo.viewModels = memo.viewModels || {};
memo.viewModels.board = {};

memo.viewModels.board.create = function (gameConfig) {
        var tileValuePairs = memo.board.createTileValuePairs(
        gameConfig.gameType,
        gameConfig.totalTileCount());
    
    var tileViewModels = [];

    for (var pairIndex = 0; pairIndex < tileValuePairs.length; pairIndex++) {
        tileViewModels.push(memo.viewModels.tile.create(tileValuePairs[pairIndex].value1));
        tileViewModels.push(memo.viewModels.tile.create(tileValuePairs[pairIndex].value2));
    }

    var remainingViewModels = _.shuffle(tileViewModels);

    var tileRows = [];

    for (var rowIndex = 0; rowIndex < gameConfig.rowCount; rowIndex++) {
        tileRows.push(_.take(remainingViewModels, gameConfig.columnCount));
        remainingViewModels = _.rest(remainingViewModels, gameConfig.columnCount);
    }

    return {
        rows: tileRows
    };
};
