angular.module('app.filters', [])
    .filter('notEmptyFood', function () {
        return function (item) {

            var array = [];

            for (var i = 0; i < item.length; i++) {
                if (item[i].food.Id != null) {
                    console.log(item[i].food);
                    array.push(item[i]);
                }
            }
            return array;
        };
    })