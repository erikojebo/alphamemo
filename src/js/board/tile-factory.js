memo.board = memo.board || {};
memo.board.createTileValuePairs = (function () {
    function createValuePair(value1, value2) {
        return {
            value1: value1,
            value2: value2
        };
    }

    function createMixedcaseValuePairs() {
        var pairs = [];

        var uppercaseStartIndex = 'A'.charCodeAt(0);
        var uppercaseEndIndex = 'Z'.charCodeAt(0);
        var uppercaseToLowercaseOffset = 'a'.charCodeAt(0) - uppercaseStartIndex;

        for (var i = uppercaseStartIndex; i < uppercaseEndIndex; i++) {
            pairs.push(
                createValuePair(
                    String.fromCharCode(i),
                    String.fromCharCode(i + uppercaseToLowercaseOffset)
                )
            );
        }

        return pairs;
    }

    return function(gameType, tileCount) {
        var valuePairs = createMixedcaseValuePairs();

        return _.take(_.shuffle(valuePairs), tileCount / 2);
    };
})();
