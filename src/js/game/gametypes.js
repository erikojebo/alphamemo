memo.game = memo.game || {};

memo.game.gameTypes = [];

memo.game.gameTypes.deselectAll = function () {
  memo.game.gameTypes.forEach(function (gameType) {
      gameType.isSelected = false;
  });
};


memo.game.gameTypes.register = function (gameType) {
    memo.game.gameTypes.push(gameType);
    memo.game.gameTypes[gameType.identifier] = gameType;

    gameType.createTiles = function (tileCount) {
        var valuePairs = gameType.create(tileCount);
        return _.take(_.shuffle(valuePairs), tileCount / 2);
    };
};
