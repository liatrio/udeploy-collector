"use strict";

var http = require('http');
var ucd = require('./ucd');
var _ = require('lodash');

var server = http.createServer(function (request, response) {

    ucd.getApplications().then(function(applications) {
        if(_.isEmpty(applications))
            console.log("boom");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Hello World\n");
    });

});

server.listen(8000);

console.log("Server running at localhost:8000/");