'use strict';
var constants = require("./constants");

var Utility = function() {};

Utility.prototype.missingFieldsError = function(response) {
    response.writeHead(400, {"Content-Type": "text/plain"});
    var componentResponseObj = JSON.stringify({message: constants.MISSING_FIELDS });
    response.end(componentResponseObj);
    return response;
};


module.exports = new Utility();