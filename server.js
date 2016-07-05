"use strict";

var http = require('http'),
    utility = require('./utility'),
    Collector = require('./collector');

http.createServer(function (request, response) {
    return new Collector().collectAndSave().then(function(result) {
       return utility.successfulRequest(response,result);
    });
}).listen(8000);

console.log("Server running at localhost:8000/");