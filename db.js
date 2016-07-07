'use strict';
var mongo = require('promised-mongo'),
    Promise = require('promise'),
    moment = require('moment'),
    _ = require('lodash'),
    url = process.env.mongoURL || "mongodb://localhost:27017/dashboard",
    constants = require('./constants'),
    db = mongo(url);

var Db = function (document) {
    this.connection = db.collection(document);
};

Db.prototype.upsertByName = function (data) {
    console.log("Upserting: ", data);
    return this.connection.update({name: data.name }, data, {upsert: true});
};

Db.prototype.bulkInsert = function(data) {
  return this.connection.insert(data);
};
Db.prototype.insertOne = function (data) {
    console.log("Inserting one:", data);
    return this.connection.insert(data).then(function (result) {
        return Promise.resolve( {id: result._id} );
    }).catch(function (err) {
        console.log("Well...something went wrong");
        return Promise.reject(err);
    });
};

Db.prototype.update = function ( content, where ) {
    return this.connection.update( content, where ).catch(function (err) {
        console.log("Well...something went wrong",err);
        return Promise.reject(err);
    });
};

Db.prototype.upsert = function ( content, where ) {
    return this.connection.update( content, where, {upsert: true} ).catch(function (err) {
        console.log("Well...something went wrong",err);
        return Promise.reject(err);
    });
};
Db.prototype.delete = function (data) {
    console.log("Deleting where: ", data);
    return this.connection.remove(data).catch(function (err) {
        console.log("Well...something went wrong");
        return Promise.reject(err);
    });

};

Db.prototype.findOne = function (data) {
    console.log("Find one where: ", data);
    return this.connection.findOne(data).catch(function (err) {
        console.log("Find one db method failed");
        return Promise.reject(err);
    });
};
Db.prototype.find = function (data) {
    console.log("Find all where: ", data);
    return this.connection.find(data).catch(function (err) {
        console.log("Find db method failed");
        return Promise.reject(err);
    });
};

Db.prototype.findById = function (data) {
    var search = {};
    if (data._id)
        search._id = data._id;
    else
        search = {_id: mongo.ObjectId(data.id)};
    return this.connection.findOne(search).catch(function (err) {
        console.log("Find by id method failed");
        return Promise.reject(err);
    });
};

module.exports = Db;
