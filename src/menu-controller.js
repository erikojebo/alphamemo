angular.module("alphamemo").controller("menuController", function ($scope) {

    function range(length) {
        var values = [];

        for (var i = 0; i < length; i++) {
            values.push(i);
        }

        return values;
    }

    function createTileSetupViewModel (rowCount, columnCount) {
        return {
            rows: range(rowCount),
            columns: range(columnCount),
            sizeIdentifier: rowCount + 'x' + columnCount
        };
    }

    function createGameTypeViewModel(description, identifier) {
        return {
            description: description,
            identifier: identifier
        };
    }

    $scope.tileCount = 0;

    $scope.tileSetups = [
        createTileSetupViewModel(3,2),
        createTileSetupViewModel(4,3),
        createTileSetupViewModel(5,4)
    ];

    $scope.gameTypes = [
        createGameTypeViewModel("AB", "uppercase"),
        createGameTypeViewModel("Ab", "mixedcase"),
        createGameTypeViewModel("12", "numbers")
    ];

    $scope.selectedTileSetupIdentifier = function () {
        return getSelectedIdenifier($scope.tileSetups);
    };

    $scope.selectedGameTypeIdentifier = function () {
        return getSelectedIdenifier($scope.gameTypes);
    };

    $scope.selectGameType = function (gameType) {
        selectItem($scope.gameTypes, gameType);
    };

    $scope.selectTileSetup = function (tileSetup) {
        selectItem($scope.tileSetups, tileSetup);
    };

    function getSelectedIdenifier(items) {
        var selectedItem = _.first(items, function (item) {
            return item.isSelected;
        });

        return selectedItem ? selectedItem.identifier : undefined;
    }

    function selectItem(collection, item) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].isSelected = false;
        }

        item.isSelected = true;
    }
});
