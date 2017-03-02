angular.module('calcApp', [])
    .controller('CalculatorController', function($scope) {
        $scope.calc = {
            capital: 100000,
            buy: {
                shares: 100,
                price: 15,
                gross: 1500,
                charges: 15,
                net: 1600
            },
            sell: {
                shares: 100,
                price: 15,
                gross: 1500,
                charges: 15,
                net: 1600
            },
            profit: {
                percent: 1,
                value: 100
            }
        };
    });
