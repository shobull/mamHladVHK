angular.module('menuControllers', [])
    .controller('OrderCreateCtrl', ['$scope', '$http',
        function ($scope, $http) {


            $scope.validateInput = true;

            $scope.phoneNumberPattern = (function () {
                var regexp = /^([0-9 ]+)$/;
                return {
                    test: function (value) {
                        if ($scope.validateInput === false) return true;
                        else return regexp.test(value);
                    }
                };
            })();

            $scope.isInvalid = function (field) {
                return $scope.newOrderForm[field].$invalid && $scope.newOrderForm[field].$dirty;
            };

            $scope.isValid = function (field) {
                return $scope.newOrderForm[field].$valid && $scope.newOrderForm[field].$dirty;
            };

            var defaultForm = {};
            $scope.clear = function (order) {
                $scope.newOrderForm.$setPristine();
                $scope.order = angular.copy(defaultForm);
            };


        }])
    .controller('OrderListCtrl', ['$scope',
        function ($scope) {
        }])
    .controller('OrderHistoryCtrl', ['$scope',
        function ($scope) {

        }])
    .controller('InventoryCtrl', ['$scope',
        function ($scope) {

        }]);