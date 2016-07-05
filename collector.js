"use strict";
//gets and saves everything
var _ = require('lodash'),
    dataService = require('./ucdDataService'),
    Db = require('./db'),
    Collector = function() {};

Collector.prototype.collectAndSave = function() {
    collect();
    log
    transform();
    log
    save();
    log
}

module.exports = Collector;

var collect = function(){
    var getApplications = dataService.collect();
    //var get...
    //var get1()

};

var save = function() {
    var db = new Db();
}