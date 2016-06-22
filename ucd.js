"use strict";
var http = require('http');
var Promise = require('promise');
var _ = require('lodash');
var Ucd =  function()  {};

Ucd.prototype.log = function() {
    return "Logging in UCD\n";
};

Ucd.prototype.getApplications = function() {
    var applications = [];
    if(_.isEmpty(applications))
        console.log("No Applications")
    return Promise.resolve(applications);
};


module.exports = new Ucd();