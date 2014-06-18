angular.module('menuControllers', [])
    .controller('OrderCreateCtrl', ['$scope', '$http',
        function ($scope, $http) {

            var food = function () {
                this.food = "";
                this.amount = 1;
            };

            var order = function () {
                this.foods = [
                    {
                        food: "",
                        amount: 1
                    }
                ];
                this.street = "";
                this.streetNumber = "";
                this.phone = "";
                this.note = "";
            };

            // inicializace formulare
            $scope.order = new order();
            $scope.validateInput = true;

            $scope.newFood = function (event) {
                var food = {
                    food: "",
                    amount: 1
                };
                $scope.order.foods.push(food);
                event.preventDefault();
            }

            $scope.phoneNumberPattern = (function () {
                var regexp = /^([0-9 ]+)$/;
                return {
                    test: function (value) {
                        if ($scope.validateInput === false) return true;
                        else return regexp.test(value);
                    }
                };
            })();

            $scope.isFormInvalid = function (subForm) {
                if (subForm.inputFood.$invalid && subForm.inputFood.$dirty) {
                    return true;
                }
                if (subForm.inputAmount.$invalid && subForm.inputAmount.$dirty) {
                    return true;
                }
                return false;
            }

            $scope.isInvalid = function (field) {
                return $scope.newOrderForm[field].$invalid && $scope.newOrderForm[field].$dirty;
            };

            $scope.isValid = function (field) {
                return $scope.newOrderForm[field].$valid && $scope.newOrderForm[field].$dirty;
            };

            var cleanOrder = new order();
            $scope.clear = function (order) {
                $scope.newOrderForm.$setPristine();
                $scope.order = angular.copy(cleanOrder);
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