"use strict";
var Promise = require('promise'),
    moment = require('moment'),
    _ = require('lodash'),
    DataService = require('./ucdDataService'),
    Db = require('./db'),
    constants = require('./constants'),
    collectorId = null,
    dataService = null,
    collectorObj = require('./models/collector'),
    Collector = function () {
        dataService = new DataService();
    };

Collector.prototype.collectAndSave = function () {
    return getCollector()
        .then(getCollectorItems)
        .then(updateCollectorItems)
        .then(collect)
        .then(transform)
        .then(save);
};

var getCollector = function () {
    console.log("servers: " + dataService.getServers());
    var collector = {};
    collector.name = constants.COLLECTOR_NAME;
    collector.collectorType = constants.COLLECTOR_TYPE;
    collector[constants.SERVER_TYPE] = dataService.getServers();
    collector.enabled = true;
    collector.online = true;
    collector.lastExecuted = moment.now();
    var db = new Db('collectors');
    return db.upsertByName(new collectorObj(collector).data).then(function () {
        return db.findOne({name: collector.name})
    }).then(function (result) {
        collectorId = result._id;
        return Promise.resolve(result);
    }).catch(function (err) {
        console.log("unable to get collector id");
        return Promise.reject(err);
    })
};

var getCollectorItems = function (collector) {
    return dataService.getCollectorItems(collector);
};

var updateCollectorItems = function (collectorItems) {
    var db = new Db('collector_items');
    console.log("Update collector items");
    return Promise.all(
        _.map(collectorItems, function (item) {
            item.data.lastUpdated = moment.now();
            return db.upsert({description: item.data.description}, item.data);
        })
    ).then(function () {
        return db.find({collectorId: Db.convertToObjectId(collectorId)});
    }).then(function (collectorItems) {
        //make a hashmap of name and id
        var hashMap = {};
        _.each(collectorItems, function (item) {
            hashMap[item.description] = item._id;
        });
        return Promise.resolve(hashMap);
    }).catch(function (err) {
        console.log("Collector items did not update correctly");
        return Promise.reject(err);
    });
};

var collect = function (data) {
    return dataService.collect(data);
};
var transform = function () {

    return Promise.resolve();
};

var save = function () {
    console.log("saving");
    //var db = new Db(data.document);
    return Promise.resolve();
    //return db.insertOne(data);

};
module.exports = Collector;
