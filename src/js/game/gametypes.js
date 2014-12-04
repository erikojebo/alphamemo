memo.game = memo.game || {};

memo.game.gameTypes = [];

(function () {

    memo.game.gameTypes.deselectAll = function () {
        memo.game.gameTypes.forEach(function (gameType) {
            gameType.isSelected = false;
        });
    };


    function addGameType(gameType) {
        memo.game.gameTypes.push(gameType);
        memo.game.gameTypes[gameType.identifier] = gameType;
    }

    memo.game.gameTypes.register = function (gameType) {

        var subTypes = gameType.subTypes || [{
            identifier: gameType.identifier,
            description1CssClass: '',
            description2CssClass: ''
        }];

        subTypes.forEach(function (subType) {

            var create = function (tileCount, languageKey) {
                var valuePairs = gameType.create(tileCount, languageKey);
                return _.take(_.shuffle(valuePairs), tileCount / 2);
            };

            var localizedDescription1 = function () {
                return gameType.description1[memo.localization.selectedLanguageKey()] ||
                    gameType.description1['en'];
            };

            var localizedDescription2 = function () {

                if (!gameType.description2) {
                    return undefined;
                }

                return gameType.description2[memo.localization.selectedLanguageKey()] ||
                    gameType.description2['en'];
            };

            var registeredGameType = {
                identifier: subType.identifier,
                localizedDescription1: localizedDescription1,
                localizedDescription2: localizedDescription2,
                description1CssClass: subType.description1CssClass,
                description2CssClass: subType.description2CssClass,
                create: create
            };

            addGameType(registeredGameType);
        });
    };

})();
