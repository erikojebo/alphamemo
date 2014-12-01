memo.localization = memo.localization || {};
memo.localization.languageViewModel = memo.localization.languageViewModel || {};

memo.localization.languageViewModel.create = function (name, key) {
  return {
      name: name,
      key: key
  };
};

