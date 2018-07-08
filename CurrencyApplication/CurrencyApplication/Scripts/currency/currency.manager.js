
var CurrencyManager = { //Currency Manager name space
    config: {}, // configuration
    webService: {}, //service    
    dataManager: {}, //service
    exception: {}, // exception
}

CurrencyManager.config = (function () {

    //Constants
    var privateConstant = {
        serviceUrl: 'http://localhost:28752/api/',
    },

        //Service related data type 
        privateServiceDataType = {
            xml: 'xml',
            json: 'json'
        },

        //JQuarry Ajax data types
        privateAjaxDataType = {
            arrayOType: 'Array',
            objectType: 'Object'
        },

        //content types
        privateContentType = {
            jsonContentType: 'application/json'
        },       

        //Request types
        privateRequestType = {
            get: 'GET',
            post: 'POST'
        }
     
    return {
        constant: privateConstant,
        serviceDataType: privateServiceDataType,
        ajaxDataType: privateAjaxDataType,
        contentType: privateContentType,
        requestType: privateRequestType
    }
}());

CurrencyManager.webService = (function () {

    // Call WEB API Service
    var privateCall = function (serviceMethod, requestType, dataType, data, callSuccessMethod, contextObject) {

        var requestData;
        if (data) {
            requestData = data;
        }
        else {
            requestData = '';
        }

        $.ajax({
            url: CurrencyManager.config.constant.serviceUrl + serviceMethod,
            context: contextObject,
            dataType: dataType,
            cache: false,
            beforeSend: function () {// this method invokes initially 
                self.dataProcessing(true);
                self.errorOccurred(false);
            },
            data: requestData,
            contentType: CurrencyManager.config.contentType.jsonContentType,
            type: requestType,
            success: function (data) {//Success method
                callSuccessMethod(data, this);
            },
            error: function (errorData) {// this method invokes If Ajax error occurred
                CurrencyManager.exception.logException(errorData.responseText + "inside: CurrencyManager.webService.call - Ajax error");
            },
            complete: function () {// this method invokes after Ajax call is completed
                self.dataProcessing(false);
            }
        });

    }
    return {
        // call WEB API service
        call: function (serviceMethod, requestType, dataType, data, callSuccessMethod, context) {
            privateCall(serviceMethod, requestType, dataType, data, callSuccessMethod, context);
        }
    }
}());

CurrencyManager.exception = (function () {

    //Private method to log and display the exception
    privaleLogException = function (message) {
        self.errorOccurred(true);
        console.log("Error occurred: " + message);
    }

    return {
        logException: function (message) { privaleLogException(message) }
    }
}());
