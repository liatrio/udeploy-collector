"use strict";

var http = require('http'),
    Collector = require('./collector');

http.createServer(function (request, response) {
    return new Collector().collectAndSave().then(function(result) {
       return successfulRequest(response,result);
    });
}).listen(8000);

var missingFieldsError = function(response) {
    response.writeHead(400, {"Content-Type": "text/plain"});
    var componentResponseObj = JSON.stringify({message: constants.MISSING_FIELDS });
    response.end(componentResponseObj);
    return response;
};
var successfulRequest = function(response,messageObj) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    var responseObj = JSON.stringify(messageObj);
    response.end(responseObj);
    return response;
};

console.log("Server running at localhost:8000/");