memo.viewModels = memo.viewModels || {};
memo.viewModels.board = {};

memo.viewModels.board.create = function (gameConfig, timeoutService) {

    var fliptime = 2000;
    var unflipPromise = null;

    var tileValuePairs = memo.board.createTileValuePairs(
        gameConfig.gameType,
        gameConfig.totalTileCount());

    var tileViewModels = [];

    for (var pairIndex = 0; pairIndex < tileValuePairs.length; pairIndex++) {
        var viewModel1 = memo.viewModels.tile.create(tileValuePairs[pairIndex].value1);
        var viewModel2 = memo.viewModels.tile.create(tileValuePairs[pairIndex].value2);

        memo.viewModels.tile.connect(viewModel1, viewModel2);

        tileViewModels.push(viewModel1);
        tileViewModels.push(viewModel2);
    }

    var remainingViewModels = _.shuffle(tileViewModels);

    var tileRows = [];

    for (var rowIndex = 0; rowIndex < gameConfig.rowCount; rowIndex++) {
        tileRows.push(_.take(remainingViewModels, gameConfig.columnCount));
        remainingViewModels = _.rest(remainingViewModels, gameConfig.columnCount);
    }

    function flippedUnmatchedTiles() {
        return tileViewModels.filter(function (vm) {
            return vm.isFlipped && !vm.isMatched;
        });
    }


    function unflip(tiles) {
        for (var i = 0; i < tiles.length; i++) {
            if (!tiles[i].isMatched) {
                tiles[i].isFlipped = false;                
            }
        }
    }

    function flip(tile) {
        var unmatchedTilesBeforeFlip = flippedUnmatchedTiles();

        if (unmatchedTilesBeforeFlip.length > 1) {
            unflip(unmatchedTilesBeforeFlip);
        }


        tile.isFlipped = true;

        if (tile.match.isFlipped) {
            tile.isMatched = true;
            tile.match.isMatched = true;
        }

        var unmatchedTilesAfterFlip = flippedUnmatchedTiles();

        if (unmatchedTilesAfterFlip.length > 1) {

            if (unflipPromise) {
                timeoutService.cancel(unflipPromise);
            }

            unflipPromise = timeoutService(function () {

                unflip(unmatchedTilesAfterFlip);
                unflipPromise = null;
            }, fliptime);
        }
    };

    return {
        rows: tileRows,
        flip: flip
    };
};
