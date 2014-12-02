memo.game.gameTypes.register({
    identifier: 'uppercase',
    description1: { en: 'AB' }, 
    create: function createUppercaseValuePairs() {
        var pairs = [];

        var uppercaseStartIndex = 'A'.charCodeAt(0);
        var uppercaseEndIndex = 'Z'.charCodeAt(0);

        for (var i = uppercaseStartIndex; i < uppercaseEndIndex; i++) {
            var letter = String.fromCharCode(i);
            pairs.push(memo.game.valuePair.create(letter, letter));
        }

        return pairs;
    }
});
