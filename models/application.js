"use strict";
var schemas = require('./../schemas'),
    _ = require('lodash'),
    db = require('../db');


var Application = function (data) {
    this.data = this.prepData(data);
    this.data = this.sanitize(data);
};
Application.prototype.data = {};


Application.prototype.getInstanceUrl = function () {
    return this.data.instanceUrl;
};
Application.prototype.getInstanceUrl = function (data) {
    this.data.instanceUrl = data.instanceUrl;
};
Application.prototype.prepData = function (data) {

};
Application.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.application;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};


Application.findById = function (id) {

};

module.exports = Application;
