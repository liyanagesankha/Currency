var AllCurrency = { //Currency Manager name space
    config: {}, // configuration    
    event: {}, //static events 
    dataManager: {}, //data manager      
    render: {}, // render
}

AllCurrency.config = (function () {

    //Constants
    var privateConstant = {
    },

        //Method names
        privateMethodName = {
            getCurrencyMethodName: 'Currencies'//API method
        },

        //Selectors
        privateSelectors = {
            allCurrencyDisplayDiv: '#allCurrencyDisplayDiv'
        }

    return {
        constant: privateConstant,
        methodName: privateMethodName,
        selectors: privateSelectors
    }
}());

AllCurrency.event = (function () {

    //private method for page Load of Get All Currency
    var privateGetAllCurrencyByPageIndex = function () {
        var serviceMethod = AllCurrency.config.methodName.getCurrencyMethodName,
            requestType = CurrencyManager.config.requestType.get,
            dataType = CurrencyManager.config.serviceDataType.json,
            callSuccessMethod = AllCurrency.render.bindAllCurrencyDataByPageIndex,
            data = { pageNumber: self.pageNumber(), itemPerPage: self.itemPerPage };
        CurrencyManager.webService.call(serviceMethod, requestType, dataType, data, callSuccessMethod, null);
    }

    return {
        getAllCurrencyByPageIndex: function () { privateGetAllCurrencyByPageIndex(); }
    }

}());

AllCurrency.dataManager = (function () {

    //View Model
    var privateAllCurrencyViewModel = function () {
        self = this;
        self.errorOccurred = ko.observable(false);
        self.dataProcessing = ko.observable(false);
        self.itemCollection = ko.observableArray();
        self.itemCollection.removeAll();
        self.pageNumber = ko.observable(0);
        self.itemPerPage = 3;
        self.displayPageNumber = ko.computed(function () {
            return self.pageNumber() + 1;
        });

        //visibility of previous icon
        self.hasPrevious = ko.computed(function () {
            return self.pageNumber() !== 0;
        });

        //visibility of next icon
        self.hasNext = ko.computed(function () {
            return self.itemCollection().length === self.itemPerPage;
        });

        //Click event of next
        self.next = function () {
            self.pageNumber(self.pageNumber() + 1);
            AllCurrency.event.getAllCurrencyByPageIndex();
        };

        //Click event of previous
        self.previous = function () {
            if (self.pageNumber() != 0) {
                self.pageNumber(self.pageNumber() - 1);
                AllCurrency.event.getAllCurrencyByPageIndex();
            }
        };
    },
        privateInit = function () {
            //Bind the view model to Dom
            ko.applyBindings(new AllCurrency.dataManager.allCurrencyViewModel(), $(AllCurrency.config.selectors.allCurrencyDisplayDiv)[0]);
        }

    return {
        allCurrencyViewModel: function () { privateAllCurrencyViewModel(); },
        init: function () { privateInit(); }
    }

}());

AllCurrency.render = (function () {
    
        // private method for bindAllCurrencyDataByPageIndex
        privateBindAllCurrencyDataByPageIndex = function (data, context) {
            if (data) {
                var currencyRates = data.rowField;
                if (currencyRates) {
                    //Remove data remove collection
                    self.itemCollection.removeAll();

                    //Add items to currency collection
                    AllCurrency.render.addItemsToCurrencyCollection(currencyRates);
                }
                else {
                    CurrencyManager.exception.logException("Return rowField property is null or empty data. || inside: AllCurrency.render.bindAllCurrencyDataByPageIndex");
                }
            } else {
                CurrencyManager.exception.logException("Return null or empty data. || inside: AllCurrency.render.bindAllCurrencyDataByPageIndex");
            }
        },

        // private method for add items to currency collection
        privateAddItemsToCurrencyCollection = function (currencyRates) {
            if (currencyRates) {
                //Iterate currency data
                $(currencyRates).each(function (index, element) {
                    var mappedItem =
                        {
                            Code: element.swift_codeField,
                            Name: element.swift_nameField,
                            BuyCash: element.buy_cashField,
                            SellCash: element.sell_cashField
                        };

                    //add the item to collection
                    self.itemCollection.push(mappedItem);
                });
            } else {
                CurrencyManager.exception.logException("Return null or empty data. || inside: AllCurrency.render.addItemsToCurrencyCollection");
            }

        }

    return {
        bindAllCurrencyDataByPageIndex: function (data, context) { privateBindAllCurrencyDataByPageIndex(data, context); },//bind data by page index
        addItemsToCurrencyCollection: function (currencyRates) { privateAddItemsToCurrencyCollection(currencyRates); }
    }

}());

$(document).ready(function () {

    //Init
    AllCurrency.dataManager.init();
    //Event to get and display all currency data
    AllCurrency.event.getAllCurrencyByPageIndex();
});