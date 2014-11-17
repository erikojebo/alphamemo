memo.viewModels = memo.viewModels || {};
memo.viewModels.tile = {};

memo.viewModels.tile.create = function(value) {
    return {
        value: value,
        isFlipped: false,
        match: null // set by calling connect with two view matching view models
    };
};

memo.viewModels.tile.connect = function (viewModel1, viewModel2) {
    viewModel1.match = viewModel2;
    viewModel2.match = viewModel1;
};
