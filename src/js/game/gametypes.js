memo.game = memo.game || {};

memo.game.gameTypes = [];

memo.game.gameTypes.register = function (gameType) {
    memo.game.gameTypes.push(gameType);
    memo.game.gameTypes[gameType.identifier] = gameType;
};
