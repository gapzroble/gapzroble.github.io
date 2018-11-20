var app = angular.module('calcApp', ['ngStorage'])
.controller('CalculatorController', function($scope, $localStorage, calc) {
    $scope.step = {
        shares: 1,
        price: 1,
        fixed: 2
    };
    var target = 0.05; // %
    $scope.data = $localStorage.$default({
        capital: 170000,
        buy: {
            shares: null,
            price: null,
            gross: null,
            charges: null,
            net: null
        },
        sell: {
            shares: null,
            price: null,
            gross: null,
            charges: null,
            net: null
        },
        profit: {
            percent: null,
            value: null
        }
    });
    function computeGain() {
        if ($scope.data.buy.net > 0 && $scope.data.sell.net > 0) {
            $scope.data.profit.value = $scope.data.sell.net - $scope.data.buy.net;
            $scope.data.profit.percent = 100 * ($scope.data.profit.value / $scope.data.buy.net);
        }
    }
    function computeSell() {
        if ($scope.data.sell.shares > 0 && $scope.data.sell.price > 0) {
            var result = calc.computeSell($scope.data.sell.shares, $scope.data.sell.price);
            $scope.data.sell.gross = result.grossAmount;
            $scope.data.sell.charges = result.charge;
            $scope.data.sell.net = result.netAmount;

            computeGain();
        }
    }
    $scope.$watch(function () {
        return $scope.data.sell.price;
    }, computeSell);
    $scope.$watch(function () {
        return $scope.data.sell.shares;
    }, computeSell);
    function computeBuy() {
        if ($scope.data.buy.shares > 0 && $scope.data.buy.price > 0) {
            var result = calc.computeBuy($scope.data.buy.shares, $scope.data.buy.price);
            $scope.data.buy.gross = result.grossAmount;
            $scope.data.buy.charges = result.charge;
            $scope.data.buy.net = result.netAmount;

            $scope.data.sell.shares = $scope.data.buy.shares;
            var price = $scope.data.buy.price * (1 + (target / 100));
            $scope.data.sell.price = parseFloat(price.toFixed($scope.step.fixed));
            computeSell();
        }
    }
    function computeShares(value) {
        if ($scope.data.buy.price > 0) {
            var params = calc.format($scope.data.buy.price),
                shares = params.boardlot,
                min = value / $scope.data.buy.price;
            while (true) {
                if (shares + params.boardlot > min) {
                    break;
                }
                shares += params.boardlot;
            }
            $scope.data.buy.shares = shares;
            computeBuy();
        }
    }
    $scope.$watch('data.capital', computeShares);
    $scope.$watch(function () {
        return $scope.data.buy.price;
    }, function (value) {
        if ($scope.data.capital > 0) {
            computeShares($scope.data.capital);
        }

        var params = calc.format(value);
        $scope.step = {
            shares: params.boardlot,
            price: params.fluctuation,
            fixed: params.toFixed
        };
    });
    $scope.$watch(function () {
        return $scope.data.buy.shares;
    }, computeBuy);
});
