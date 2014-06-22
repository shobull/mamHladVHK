angular.module('app.filters', [])
    .filter('notEmptyFood', function () {
        return function (item) {

            var array = [];

            for (var i = 0; i < item.length; i++) {
                if (item[i].food.Id != null) {
                    array.push(item[i]);
                }
            }
            return array;
        };
    })

    .filter('currency', function () {
        return function (string) {
            return string + " Kč";
        }
    })