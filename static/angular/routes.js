angular.module('root.module', [
        'ngRoute',
        'menuControllers',
        'app.directives',
        'app.filters'
    ])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/nova-objednavka', {
                    templateUrl: 'templates/new-order.html',
                    controller: 'OrderCreateCtrl'
                }).
                when('/aktualni-objednavky', {
                    templateUrl: 'templates/list-orders.html',
                    controller: 'OrderListCtrl'
                }).
                when('/historie-objednavek', {
                    templateUrl: 'templates/history-orders.html',
                    controller: 'OrderHistoryCtrl'
                }).
                when('/inventura', {
                    templateUrl: 'templates/inventory.html',
                    controller: 'InventoryCtrl'
                })
                .
                otherwise({
                    redirectTo: '/nova-objednavka'
                });
        }])
    .controller('menuCtrl', ['$scope', '$location',
        function ($scope, $location) {

            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };

        }]);

