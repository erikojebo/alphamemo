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

    function createLowercaseValuePairs() {
        var pairs = [];

        var lowercaseStartIndex = 'a'.charCodeAt(0);
        var lowercaseEndIndex = 'z'.charCodeAt(0);

        for (var i = lowercaseStartIndex; i < lowercaseEndIndex; i++) {
            var letter = String.fromCharCode(i);
            pairs.push(createValuePair(letter, letter));
        }

        return pairs;
    }

    function createUppercaseValuePairs() {
        var pairs = [];

        var uppercaseStartIndex = 'A'.charCodeAt(0);
        var uppercaseEndIndex = 'Z'.charCodeAt(0);

        for (var i = uppercaseStartIndex; i < uppercaseEndIndex; i++) {
            var letter = String.fromCharCode(i);
            pairs.push(createValuePair(letter, letter));
        }

        return pairs;
    }
    
    function createNumberValuePairs(tileCount) {
        var pairs = [];

        for (var i = 0; i < tileCount; i++) {
            pairs.push(createValuePair(i, i));
        }

        return pairs;
    }
    
    return function(gameType, tileCount) {
        var valuePairs = null;

        gameType = gameType.toLowerCase();

        if (gameType == "mixedcase") {
            valuePairs = createMixedcaseValuePairs();
        } else if (gameType == "lowercase") {
            valuePairs = createLowercaseValuePairs();
        } else if (gameType == "numbers") {
            valuePairs = createNumberValuePairs(tileCount);
        } else {
            valuePairs = createUppercaseValuePairs();
        }

        return _.take(_.shuffle(valuePairs), tileCount / 2);
    };
})();
