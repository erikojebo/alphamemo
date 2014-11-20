var memo = memo || {};

var app = angular.module("alphamemo", ["ngRoute"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/menu/', {
            templateUrl: 'menu.html',
            controller: 'menuController'
        })
        .when('/board/:gameType/:boardSize', {
            templateUrl: 'board.html',
            controller: 'boardController'
        })
        .otherwise({
          redirectTo: '/menu'
      });;
}]);

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        Origami.fastclick(document.body);
    }, false);
}
