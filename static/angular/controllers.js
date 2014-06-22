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

            // Vytvori novy radek s prazdnym jilem
            $scope.createEmptyFood = function () {
                var food = {
                    food: "",
                    amount: 1
                };
                $scope.order.foods.push(food);
            }

            $scope.deleteFood = function (index) {
                if ($scope.order.foods.length > 1) {
                    $scope.order.foods.splice(index, 1);
                }
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


            $scope.selectedItem = -1;


            // Nastavi formular do puvodniho stavu
            var cleanOrder = new order();
            $scope.clear = function (order) {
                $scope.newOrderForm.$setPristine();
                $scope.order = angular.copy(cleanOrder);
                $scope.items = [];
            };

            // Skryje autocompleter
            $scope.hideAutocompleter = function () {
                $scope.showAutocomplete = -1;
                $scope.selectedItem = -1;
                $scope.items = [];
            }


            // Vyhledava v jidlech pro autocompleter
            $scope.items = [];
            $scope.updateAutocompleter = function (keyword, index) {
                $scope.showAutocomplete = index;
                $http.get('/mamhladvhk/php/api/food?q=' + keyword)
                    .then(function (result) {
                        $scope.items = result.data.jidelak;
                        if ($scope.items.length <= $scope.selectedItem) {
                            $scope.refreshAutocompleter($scope.items.length - 1);
                        }
                    });
            }

            $scope.refreshAutocompleter = function (value) {
                if (value < 0) {
                    $scope.selectedItem = -1;
                } else if (value < $scope.items.length) {
                    $scope.selectedItem = value;
                } else {
                    $scope.selectedItem = $scope.items.length - 1;
                }
            }

            $scope.moveAutocompleter = function ($event, index) {
                $scope.showAutocomplete = index;
                if ($event.which == 40) {
                    // Arrow down pressed
                    $scope.refreshAutocompleter($scope.selectedItem + 1);
                    $event.preventDefault();
                } else if ($event.which == 38) {
                    // Arrow up pressed
                    $scope.refreshAutocompleter($scope.selectedItem - 1);
                    $event.preventDefault();
                } else if ($event.which == 13) {
                    // Enter pressed
                    $scope.selectFood(index);
                } else if ($event.which == 27) {
                    // Esc pressed
                    $scope.deleteFood(index);
                } else if ($event.which == 39 || $event.which == 37) {
                    // Arrow left or right pressed
                    $scope.hideAutocompleter();
                }
            }

            // Zvoli jidlo
            $scope.selectFood = function (foodIndex) {
                var index = $scope.selectedItem;
                $scope.order.foods[foodIndex].food = $scope.items[index];
                $scope.items = [];

                var lastFoodIndex = $scope.order.foods.length - 1;

                if ($scope.order.foods[lastFoodIndex].food.Id != null) {
                    // Pokud neni posledni radek prazdny, tak pridam novy pro dalsi jidlo
                    $scope.createEmptyFood();
                }

                $scope.hideAutocompleter();
            }

            // Spocita cenu vsech kusu
            $scope.totalFoodPrice = function (item) {
                return (item.food.Prize * item.amount);
            }

            // Spocita celkovou cenu objednavky
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
    .
    controller('OrderListCtrl', ['$scope',
        function ($scope) {
        }])
    .controller('OrderHistoryCtrl', ['$scope',
        function ($scope) {
        }])
    .controller('InventoryCtrl', ['$scope',
        function ($scope) {
        }]);