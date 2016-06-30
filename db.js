'use strict';
var mongo = require('promised-mongo');
var Promise = require('promise');
var url = process.env.mongoURL || "mongodb://localhost:27017/dashboard";
var db = mongo('mongodb://localhost:27017/dashboard');

var Db = function (document) {
    this.connection = db.collection(document);
};

Db.prototype.insertOne = function (data) {
    return this.connection.insert(data).then(function(result) {
        return Promise.resolve(result._id);
    }).catch(function (err) {
        console.log("Well...something went wrong");
        return Promise.reject(err);
    });
};

Db.prototype.delete = function(data) {
    return this.connection.remove(data);
};

module.exports = Db;
