memo.game.gameTypes.register({
    identifier: 'mixedcase',
    description1: { en: 'Ab' },
    create: function () {
        var pairs = [];

        var uppercaseStartIndex = 'A'.charCodeAt(0);
        var uppercaseEndIndex = 'Z'.charCodeAt(0);
        var uppercaseToLowercaseOffset = 'a'.charCodeAt(0) - uppercaseStartIndex;

        for (var i = uppercaseStartIndex; i < uppercaseEndIndex; i++) {
            pairs.push(
                memo.game.valuePair.create(
                    String.fromCharCode(i),
                    String.fromCharCode(i + uppercaseToLowercaseOffset)
                )
            );
        }

        return pairs;
    }
});
