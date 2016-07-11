'use strict';
var _ = require('lodash'),
    schemas = require('./../ucdSchema');

var Component = function (data) {
    this.data = this.prepData(data);
    this.data = this.sanitize(data);
};
Component.prototype.data = {};

Component.prototype.prepData = function (data) {
    data.name = data.component.name;
    data.version = data.version.name;
    data.environmentId = data.environment.environmentId;
    data.environmentName = data.environment.name;
    //data.deployed = data.compliancy.desiredCount == data.compliancy.missingCount;
    data.asOfDate = data.date;
    return data;
};
Component.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.component;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};
module.exports = Component;