memo.game.gameTypes.register({
    description1: { en: 'a' },
    description2: { en: 'a' },
    subTypes: [{
        identifier: 'uppercase',
        description1CssClass: 'upper',
        description2CssClass: 'upper'
    }, {
        identifier: 'lowercase',
        description1CssClass: 'lower',
        description2CssClass: 'lower'
    }, {
        identifier: 'mixedcase',
        description1CssClass: 'upper',
        description2CssClass: 'lower'
    }],
    create: function () {
        var pairs = [];

        var lowercaseStartIndex = 'a'.charCodeAt(0);
        var lowercaseEndIndex = 'z'.charCodeAt(0);

        for (var i = lowercaseStartIndex; i < lowercaseEndIndex; i++) {
            var letter = String.fromCharCode(i);
            pairs.push(memo.game.valuePair.create(letter, letter));
        }

        return pairs;
    }
});
