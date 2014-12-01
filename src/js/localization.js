memo.localization = (function () {

    var translations = {
        language: { en: 'language', sv: 'språk' }
    };

    function currentLanguage() {
        return window.navigator.language.split('-')[0];
    }
    
    function localize(key) {
        return translations[key][currentLanguage()];
    }

    return {
        localize: localize
    };
})();
