"use strict";
var Promise = require('promise'),
    moment = require('moment'),
    DataService = require('./ucdDataService'),
    Db = require('./db'),
    constants = require('./constants'),
    collectorId = null,
    dataService = null,
    collectorObj = require('./models/collector'),
    Collector = function() {
        dataService = new DataService();
    };

Collector.prototype.collectAndSave = function() {
    return getCollector()
        .then(getCollectorItems)
        .then(updateCollectorItems)
        .then(collect)
        .then(transform)
        .then(save);
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
    return db.upsertByName( new collectorObj(collector).data ).then(function(result) {
        return db.findOne({name: collector.name})
    }).then(function(result){
        collectorId = result._id;
        console.log("RESULT",result);
        return Promise.resolve(result);
    }).catch(function(err) {
        console.log("unable to get collector id");
        return Promise.reject(err);
    })
};

var getCollectorItems = function(collector) {
    console.log(collector);
    return dataService.getCollectorItems();
}

var updateCollectorItems = function(collectorItems) {
    console.log("Collector Items", collectorItems);
    //get all collector items from database
    //compare to collectorItems in ucd
    //update database list
    return Promise.resolve(collectorItems);
};

var collect = function(){
    return Promise.resolve();
    //return new DataService.collect();
};
var transform = function() {

  return Promise.resolve();
};

var save = function(data) {
    console.log("saving")
    //var db = new Db(data.document);
    return Promise.resolve();
    //return db.insertOne(data);

};
module.exports = Collector;
