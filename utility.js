'use strict';
var constants = require("./constants");

var Utility = {};

Utility.missingFieldsError = function(response) {
    response.writeHead(400, {"Content-Type": "text/plain"});
    var componentResponseObj = JSON.stringify({message: constants.MISSING_FIELDS });
    response.end(componentResponseObj);
    return response;
};
Utility.successfulRequest = function(response,messageObj) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    var responseObj = JSON.stringify(messageObj);
    response.end(responseObj);
    return response;
};


module.exports =  Utility;