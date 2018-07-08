var UsdAndEurCurrency = { //USD and EUR Currency name space
    config: {}, // configuration    
    event: {}, //static events 
    dataManager: {}, //data manager      
    render: {} // render
}

UsdAndEurCurrency.config = (function () {

    var privateConstant = {
        usdCurrencyCode: 'USD',
        eurCurrencyCode: 'EUR'
    },

        privateMethodName = {
            getCurrencyMethodName: 'Currencies'
        },

        privateSelectors = {
            usdAndEurDataDisplayButton: '#usdAndEurDataDisplayButton',
            usdAndEurDataDisplayDiv: '#usdAndEurDataDisplayDiv',
        }

    return {
        constant: privateConstant,
        methodName: privateMethodName,
        selectors: privateSelectors
    }
}());

UsdAndEurCurrency.event = (function () {

    var privateGetUsdAndEurCurrency = function () {
        var serviceMethod = UsdAndEurCurrency.config.methodName.getCurrencyMethodName,
            requestType = CurrencyManager.config.requestType.get,
            dataType = CurrencyManager.config.serviceDataType.json,
            callSuccessMethod = UsdAndEurCurrency.render.bindUsdAndEurCurrencyData,
            data = { pageNumber: -1, itemPerPage: -1 };
        CurrencyManager.webService.call(serviceMethod, requestType, dataType, data, callSuccessMethod, null);
    }

    return {
        getUsdAndEurCurrency: function () { privateGetUsdAndEurCurrency(); }
    }

}());

UsdAndEurCurrency.dataManager = (function () {
    var privateHomeViewModel = function () {
        self = this;
        self.errorOccurred = ko.observable(false);
        self.dataProcessing = ko.observable(false);
        self.usdCurrencyData = ko.observable({});
        self.eurCurrencyData = ko.observable({});
        self.getUsdAndEurCurrency = function () {
            UsdAndEurCurrency.event.getUsdAndEurCurrency();
        };
    },
        //Init - apply view model to dom
        privateInit = function () {
            ko.applyBindings(new UsdAndEurCurrency.dataManager.homeViewModel());
        }

    return {
        homeViewModel: function (data, context) { privateHomeViewModel(); },
        init: function () { privateInit(); }
    }

}());

UsdAndEurCurrency.render = (function () {
    //Bind USD and EUR data to view
    var privateBindUsdAndEurCurrencyData = function (data, context) {
        if (data) {
            var currencyRates = data.rowField;
            if (currencyRates) {
                //Iterate data
                $(currencyRates).each(function (index, element) {
                    if (element.swift_codeField === UsdAndEurCurrency.config.constant.usdCurrencyCode ||
                        element.swift_codeField === UsdAndEurCurrency.config.constant.eurCurrencyCode) {
                        var mappedItem =
                            {
                                Code: element.swift_codeField,
                                Name: element.swift_nameField,
                                BuyCash: element.buy_cashField,
                                SellCash: element.sell_cashField
                            };

                        if (mappedItem.Code === UsdAndEurCurrency.config.constant.usdCurrencyCode) {
                            self.usdCurrencyData(mappedItem);
                        }
                        else if (mappedItem.Code === UsdAndEurCurrency.config.constant.eurCurrencyCode) {
                            self.eurCurrencyData(mappedItem);
                        }
                    }
                });

                $(UsdAndEurCurrency.config.selectors.usdAndEurDataDisplayDiv).css("display", "block"); //display the relevant div for UAD and EUR currency
            }
            else {
                CurrencyManager.exception.logException("Return rowField property is null or empty data. || inside: UsdAndEurCurrency.render.bindUsdAndEurCurrencyData");
            }

        } else {
            CurrencyManager.exception.logException("Return null or empty data. || inside: UsdAndEurCurrency.render.bindUsdAndEurCurrencyData");
        }
    }

    return {
        bindUsdAndEurCurrencyData: function (data, context) { privateBindUsdAndEurCurrencyData(data, context); }//bind home page data
    }
}());


$(document).ready(function () {
    //init
    UsdAndEurCurrency.dataManager.init();
});