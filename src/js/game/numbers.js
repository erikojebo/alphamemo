memo.game.gameType.register({
    identifier: 'numbers',
    description1: { en: '12' },
    create: function createNumberValuePairs(tileCount) {
        var pairs = [];

        for (var i = 0; i < tileCount; i++) {
            pairs.push(memo.game.valuePair.create(i, i));
        }

        return pairs;
    }
});
