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
        .then(save);
};

var getCollector = function () {
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
        var hashMap = {};
        _.each(collectorItems, function (item) {
            hashMap[item.options.applicationId] = item._id;
        });
        console.log(hashMap);
        return Promise.resolve(hashMap);
    }).catch(function (err) {
        console.log("Collector items did not update correctly");
        return Promise.reject(err);
    });
};

var collect = function (data) {
    return dataService.collect(data);
};

var save = function (collection) {
    var db = null;
    _.each(collection, function(subCollection) {
        _.each(subCollection, function(collectedItems) {
            db = new Db(collectedItems.document);
            _.each(collectedItems.data,function(item) {
                db.upsert(
                    {
                        collectorItemId: item.data.collectorItemId,
                        environmentName: item.data.environmentName,
                        componentName: item.data.componentName
                    },
                    item.data
                ).then(function(err) {
                    return Promise.reject("Db error", err);
                });
            });
        });
    });
    return Promise.resolve();
};
module.exports = Collector;
