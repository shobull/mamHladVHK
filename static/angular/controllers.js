angular.module('menuControllers', ['ui.select2'])
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
                $scope.createEmptyFood();
                event.preventDefault();
            }

            $scope.createEmptyFood = function () {
                var food = {
                    food: "",
                    amount: 1
                };
                $scope.order.foods.push(food);
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
                $scope.showAutocomplete = -1;
                $scope.items = [];
            };

            $scope.selectedItem = -1;

            $scope.hideAutocompleter = function () {
                $scope.showAutocomplete = -1;
            }

            $scope.isEmpty = function (food) {
                if (food.Id) {
                    return true;
                }
                return false;
            }


            $scope.items = [];
            $scope.updateAutocompleter = function (keyword, index) {
                $scope.showAutocomplete = index;
                $http.get('/mamhladvhk/php/api/food?q=' + keyword)
                    .then(function (result) {
                        $scope.items = result.data.jidelak;
                    });
            }

            $scope.selectFood = function (index, foodIndex) {
                $scope.order.foods[foodIndex].food = $scope.items[index];
                $scope.items = [];
                $scope.createEmptyFood();
            }

            $scope.totalFoodPrice = function (item) {
                return (item.food.Prize * item.amount);
            }

            $scope.totalPrice = function () {
                var price = 0;
                for (var i = 0; i < $scope.order.foods.length; i++) {
                    if ($scope.order.foods[i].food.Id != null) {
                        price += $scope.order.foods[i].amount * $scope.order.foods[i].food.Prize;
                    }
                }
                return price;
            }

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