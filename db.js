'use strict';
var mongo = require('promised-mongo'),
    Promise = require('promise'),
    moment = require('moment'),
    url = process.env.mongoURL || "mongodb://localhost:27017/dashboard",
    constants = require('./constants'),
    db = mongo(url);

var Db = function (document) {
    this.connection = db.collection(document);
};

Db.prototype.upsertByName = function (data) {
    //console.log("Upserting: ", data);
    return this.connection.update({name: data.name }, data, {upsert: true});
};

Db.prototype.insertOne = function (data) {
    //console.log("Inserting one:", data);
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

Db.prototype.upsert = function ( where, content ) {
    return this.connection.update( where, content, {upsert: true} ).catch(function (err) {
        console.log("Well...something went wrong",err);
        return Promise.reject(err);
    });
};
Db.prototype.delete = function (data) {
    //console.log("Deleting where: ", data);
    return this.connection.remove(data).catch(function (err) {
        console.log("Well...something went wrong");
        return Promise.reject(err);
    });

};

Db.prototype.findOne = function (data) {
    return this.connection.findOne(data).catch(function (err) {
        console.log("Find one db method failed");
        return Promise.reject(err);
    });
};
Db.prototype.find = function (data) {
    return this.connection.find(data).then(function(result) {
        return Promise.resolve(result);
    }).catch(function (err) {
        console.log("Find db method failed");
        return Promise.reject(err);
    });
};
Db.convertToObjectId = function(id) {
  return mongo.ObjectId(id);
};

module.exports = Db;
