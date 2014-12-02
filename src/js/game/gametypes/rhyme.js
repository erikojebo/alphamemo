memo.game.gameTypes.register({
    identifier: 'rhyme',
    description1: { en: 'car', sv: 'gris' },
    description2: { en: 'star', sv: 'spis' },
    create: function (tileCount, languageKey) {
        var makePair = memo.game.valuePair.create;

        if (languageKey === 'sv') {
            return [
                makePair('spis', 'gris'),
                makePair('ko', 'bro'),
                makePair('blå', 'grå'),
                makePair('hoppa', 'loppa'),
                makePair('häst', 'fest'),
                makePair('åtta', 'potta'),
                makePair('rött', 'sött'),
                makePair('grönt', 'skönt'),
                makePair('bok', 'lok'),
                makePair('bil', 'fil'),
                makePair('mygga', 'bygga'),
                makePair('säck', 'däck'),
                makePair('sked', 'ved'),
                makePair('klocka', 'locka'),
                makePair('matta', 'platta'),
                makePair('foten', 'roten'),
                makePair('kropp', 'knopp'),
                makePair('hallen', 'skallen'),
                makePair('hand', 'sand'),
                makePair('öra', 'höra'),
                makePair('ballong', 'kalsong'),
                makePair('mat', 'fat'),
                makePair('hatt', 'katt')
            ];
        }

        return [
            makePair('oak', 'spoke'),
            makePair('heard', 'bird'),
            makePair('day', 'away'),
            makePair('night', 'right'),
            makePair('hat', 'cat'),
            makePair('dog', 'fog'),
            makePair('pig', 'fig'),
            makePair('more', 'four'),
            makePair('car', 'star'),
            makePair('goat', 'boat'),
            makePair('whale', 'tail'),
            makePair('red', 'bed'),
            makePair('back', 'black'),
            makePair('flea', 'tree'),
            makePair('grass', 'glass'),
            makePair('park', 'arc'),
            makePair('lamp', 'stamp'),
            makePair('door', 'more'),
            makePair('row', 'slow'),
            makePair('jump', 'bump'),
            makePair('sleep', 'beep')
        ];
    }
});
