"use strict";
var schemas = require('./../ucdSchema'),
    _ = require('lodash');


var Application = function (data) {
    this.data = this.prepData(data);
    this.data = this.sanitize(data);
};
Application.prototype.data = {};

Application.prototype.prepData = function (data) {
    //console.log(data);
    data.options = {};
    data.applicationId = data.id;
    data.applicationName = data.name;
    data.instanceUrl =  process.env.ucdUrl;
    return data;
};
Application.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.application;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = Application;
