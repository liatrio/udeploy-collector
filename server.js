"use strict";

var http = require('http');
var ucd = require('./ucd');


http.createServer(function (request, response) {
    //return ucd.getEnvironmentsForApplication().then(function (environments) {
    //    if (_.isEmpty(environments))
    //        console.log("boom");
    //    response.writeHead(200, {"Content-Type": "text/plain"});
    //    var environmentResponseObj = JSON.stringify({ environments: environments}) + "\n";
    //    console.log(environmentResponseObj);
    //    response.end(environmentResponseObj);
    //    return response;
    //});

    //return ucd.getApplications().then(function (applications) {
    //    response.writeHead(200, {"Content-Type": "text/plain"});
    //    var environmentResponseObj = JSON.stringify({ applications: applications}) + "\n";
    //    console.log(environmentResponseObj);
    //    response.end(environmentResponseObj);
    //    return response;
    //});
    return ucd.getComponentsInEnvironment().then(function(components) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        var componentResponseObj = JSON.stringify({components: components });
        response.end(componentResponseObj);
        return response;
    });
}).listen(8000);

console.log("Server running at localhost:8000/");