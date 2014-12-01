angular.module("alphamemo").controller("appController", function ($scope) {
    $scope.localize = memo.localization.localize;

    $scope.isMenuVisible = false;

    $scope.toggleMenuVisibility = function () {
        $scope.isMenuVisible = !$scope.isMenuVisible;
    };

    $scope.hideMenu = function () {
        $scope.isMenuVisible = false;
    };
    
    $scope.showMenu = function () {
        $scope.isMenuVisible = true;
    };

    $scope.languages = memo.localization.languages;
});
