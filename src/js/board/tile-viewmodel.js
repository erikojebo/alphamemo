memo.viewModels = memo.viewModels || {};
memo.viewModels.tile = {};

memo.viewModels.tile.create = function(value) {
    var cell = {
        value: value,
        isFlipped: false
    };

    cell.flip = function () {
        cell.isFlipped = true;
    };

    return cell;
};
