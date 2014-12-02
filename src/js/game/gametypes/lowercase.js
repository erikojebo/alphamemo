memo.game.gameTypes.register({
    identifier: 'lowercase',
    description1: { en: 'ab' },
    create: function createLowercaseValuePairs() {
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
