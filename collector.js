"use strict";
//gets and saves everything
var _ = require('lodash'),
    Promise = require('promise'),
    DataService = require('./ucdDataService'),
    Db = require('./db'),
    Collector = function() {};

Collector.prototype.collectAndSave = function() {
    return collect.then(function(data) {
        console.log(data);
        return transform(data);
    }).then(function(data) {
        console.log(data);
        return save(data);
    });

};

var collect = function(){
    return DataService.collect();
};
var transform = function() {
  return Promise.resolve();
};

var save = function() {
    var db = new Db();
};
module.exports = Collector;
