app.factory('calc', function () {
    // http://pse-tools.com/tools/average-calculator
    var calculator = {
        BROKER_COMMISSION: 0.0025,
        MIN_BROKER_COMMISSION: 20.0,
        VAT: 0.12,
        TRANSACTION_FEE: 0.00005,
        SCCP_FEE: 0.0001,
        SALES_TAX: 0.005,
        computeBuy: function(noOfShares, price) {
            var grossAmount = noOfShares * price;
            var brokerCommission = Math.max(this.MIN_BROKER_COMMISSION, grossAmount * this.BROKER_COMMISSION);
            var vat = brokerCommission * this.VAT;
            var transactionFee = grossAmount * this.TRANSACTION_FEE;
            var sccpFee = grossAmount * this.SCCP_FEE;
            var charge = brokerCommission + vat + transactionFee + sccpFee;
            var netAmount = grossAmount + charge;
            return {
                grossAmount: grossAmount,
                brokerCommission: brokerCommission,
                vat: vat,
                transactionFee: transactionFee,
                sccpFee: sccpFee,
                charge: charge,
                netAmount: netAmount,
            };
        },
        computeSell: function(noOfShares, price) {
            var grossAmount = noOfShares * price;
            var brokerCommission = Math.max(this.MIN_BROKER_COMMISSION, grossAmount * this.BROKER_COMMISSION);
            var vat = brokerCommission * this.VAT;
            var transactionFee = grossAmount * this.TRANSACTION_FEE;
            var sccpFee = grossAmount * this.SCCP_FEE;
            var salesTax = grossAmount * this.SALES_TAX;
            var charge = brokerCommission + vat + transactionFee + sccpFee + salesTax;
            var netAmount = grossAmount - charge;
            return {
                grossAmount: grossAmount,
                brokerCommission: brokerCommission,
                vat: vat,
                transactionFee: transactionFee,
                sccpFee: sccpFee,
                salesTax: salesTax,
                charge: charge,
                netAmount: netAmount,
            };
        },
        computeGain: function(buyResult, sellResult) {
            var gainLoss = sellResult.netAmount - buyResult.netAmount;
            var gainLossPercentage = (buyResult.grossAmount || sellResult.grossAmount) ? (gainLoss / buyResult.netAmount) : 0;
            return {
                gainLoss: gainLoss,
                gainLossPercentage: gainLossPercentage,
            };
        },
        format: function(price) {
            if (price <= 0.0099) {
                return {
                    fluctuation: 0.0001,
                    boardlot: 1000000,
                    toFixed: 4,
                    numeral: '0,0.0000',
                };
            } else if (price <= 0.0490) {
                return {
                    fluctuation: 0.001,
                    boardlot: 100000,
                    toFixed: 3,
                    numeral: '0,0.000',
                };
            } else if (price <= 0.2490) {
                return {
                    fluctuation: 0.001,
                    boardlot: 10000,
                    toFixed: 3,
                    numeral: '0,0.000',
                };
            } else if (price <= 0.4950) {
                return {
                    fluctuation: 0.005,
                    boardlot: 10000,
                    toFixed: 3,
                    numeral: '0,0.000',
                };
            } else if (price <= 4.9900) {
                return {
                    fluctuation: 0.01,
                    boardlot: 1000,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 9.9900) {
                return {
                    fluctuation: 0.01,
                    boardlot: 100,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 19.9800) {
                return {
                    fluctuation: 0.02,
                    boardlot: 100,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 49.9500) {
                return {
                    fluctuation: 0.05,
                    boardlot: 100,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 99.9500) {
                return {
                    fluctuation: 0.05,
                    boardlot: 10,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 199.9000) {
                return {
                    fluctuation: 0.10,
                    boardlot: 10,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 499.8000) {
                return {
                    fluctuation: 0.20,
                    boardlot: 10,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 999.5000) {
                return {
                    fluctuation: 0.50,
                    boardlot: 10,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 1999.0000) {
                return {
                    fluctuation: 1.00,
                    boardlot: 5,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else if (price <= 4998.0000) {
                return {
                    fluctuation: 2.00,
                    boardlot: 5,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            } else {
                return {
                    fluctuation: 5.00,
                    boardlot: 5,
                    toFixed: 2,
                    numeral: '0,0.00',
                };
            }
        }
    };

    return calculator;
});
