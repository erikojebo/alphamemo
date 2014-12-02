memo.localization = memo.localization || {};

(function () {

    memo.localization.languages = [
        memo.localization.languageViewModel.create('english', 'en'),
        memo.localization.languageViewModel.create('svenska', 'sv')
    ];

    // Call with language instance or language key
    memo.localization.languages.select = function (language) {
        memo.localization.languages.forEach(function (l) {
            l.isSelected = l === language || l.key === language;
        });

        localStorage.selectedLanguageKey = memo.localization.languages.selected().key;
    };

    memo.localization.languages.selected = function () {
        return _.find(memo.localization.languages, function (l) {
            return l.isSelected;
        });
    };

    memo.localization.languages.select(
        localStorage.selectedLanguageKey || currentBrowserLanguage());

    memo.localization.selectedLanguageKey = function () {
        return memo.localization.languages.selected().key;
    };
    
    var translations = {
        language: { en: 'language', sv: 'språk' }
    };

    function currentBrowserLanguage() {
        return window.navigator.language.split('-')[0];
    }
    
    memo.localization.localize = function(key) {
        return translations[key][currentBrowserLanguage()];
    };
})();
