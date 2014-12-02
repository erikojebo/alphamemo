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

    gameType.createTiles = function (tileCount, languageKey) {
        var valuePairs = gameType.create(tileCount, languageKey);
        return _.take(_.shuffle(valuePairs), tileCount / 2);
    };

    gameType.localizedDescription1 = function () {
        return gameType.description1[memo.localization.selectedLanguageKey()] ||
            gameType.description1['en'];
    };

    gameType.localizedDescription2 = function () {

        if (!gameType.description2) {
            return undefined;
        }
        
        return gameType.description2[memo.localization.selectedLanguageKey()] ||
            gameType.description2['en'];
    };
};
