"use strict";
var assert = require('assert'),
    DB = require("../db"),
    Promise = require('promise'),
    base_url = "http://localhost:3000/";

describe("DB tests", function() {
    describe("inserts", function() {
        it("insert one componet", function() {
            var data = {
                    name : 'testComponent' ,
                    environmentName : 'testEnvironment'
            };
            var db = new DB('components');
            return db.insertOne(data).then(function(result) {
                console.log(result);
                return Promise.resolve(result);
            });
        });

        it.only("delete all test data", function() {
           var data = {
                   name : 'testComponent' ,
                   environmentName : 'testEnvironment'
           };
            var db = new DB('components');
            return db.delete(data).then(function(result) {
                console.log(result);
                return Promise.resolve(result);
            });
        });

    });
});

