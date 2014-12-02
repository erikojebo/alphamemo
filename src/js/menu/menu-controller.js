angular.module("alphamemo").controller("menuController", function ($scope, $location, $timeout) {

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
            identifier: rowCount + 'x' + columnCount
        };
    }

    function createGameTypeViewModel(identifier, description1, description2) {
        return {
            description1: description1,
            description2: description2,
            identifier: identifier
        };
    }

    $scope.tileCount = 0;

    $scope.tileSetups = [
        createTileSetupViewModel(3,2),
        createTileSetupViewModel(4,3),
        createTileSetupViewModel(5,4)
    ];

    memo.game.gameTypes.deselectAll();
    $scope.gameTypes = memo.game.gameTypes;

    $scope.selectedTileSetupIdentifier = function () {
        return getSelectedIdenifier($scope.tileSetups);
    };

    $scope.selectedGameTypeIdentifier = function () {
        return getSelectedIdenifier($scope.gameTypes);
    };

    $scope.selectGameType = function (gameType) {

        if ($scope.hasSelectedTileSetup()) {
            selectItem($scope.gameTypes, gameType);

            $timeout(function () {
                $location.path(
                    '/board/' + $scope.selectedGameTypeIdentifier() + '/' +
                        $scope.selectedTileSetupIdentifier());
            }, 300);
        }
    };

    $scope.selectTileSetup = function (tileSetup) {
        selectItem($scope.tileSetups, tileSetup);
    };

    $scope.isSetupComplete = function () {
        return $scope.selectedTileSetupIdentifier() &&
            $scope.selectedGameTypeIdentifier();
    };

    $scope.hasSelectedTileSetup = function () {
        return $scope.selectedTileSetupIdentifier();
    };

    function getSelectedIdenifier(items) {
        var selectedItem = _.find(items, function (item) {
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
