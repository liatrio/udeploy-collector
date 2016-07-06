"use strict";
var Promise = require('promise'),
    DataService = require('./ucdDataService'),
    Db = require('./db'),
    constants = require('./constants'),
    collectorId = null,
    dataService = null,
    Collector = function() {
        dataService = new DataService();
    };

Collector.prototype.collectAndSave = function() {
    return getCollector().then(getCollectorItems).then(updateCollectorItems).then(collect).then(function(data) {
        console.log(data);
        return transform(data);
    }).then(function(data) {
        console.log(data);
        return save(data);
    });

};

var getCollector = function() {
    var udeployServers = [];
    udeployServers[0] = process.env.ucdUrl || "empty";
    var collector = {};
    collector.name = constants.COLLECTOR_NAME;
    collector.collectorType = constants.COLLECTOR_TYPE;
    collector.udeployServers = udeployServers;
    collector.enabled = true;
    collector.online = true;
    collector.lastExecuted = moment.now();
    var db = new Db('collectors');
    return db.upsertByName( new Collector(collector) ).then(function(result) {
        collectorId = result._id;
        return Promise.resolve(result);
    }).catch(function(err) {
        console.log(err);
        console.log("unable to get collector id")
        return Promise.reject(err);
    })
};

var getCollectorItems = function() {
    return dataService.getCollectorItems();
};

var updateCollectorItems = function(collectorItems) {
    //get all collector items from database
    //compare to collectorItems in ucd
    //update database list
};

var collect = function(){
    return new DataService.collect();
};
var transform = function() {
  return Promise.resolve();
};

var save = function(data) {
    var db = new Db(data.document);
    return db.insertOne(data);

};
module.exports = Collector;
