memo.board = memo.board || {};
memo.board.createTileValuePairs = (function () {

    return function(gameTypeIdentifier, tileCount) {
        var valuePairs = null;

        gameTypeIdentifier = gameTypeIdentifier.toLowerCase();

        var gameType = memo.game.gameTypes[gameTypeIdentifier];

        valuePairs = gameType.create(tileCount);

        return _.take(_.shuffle(valuePairs), tileCount / 2);
    };
})();
