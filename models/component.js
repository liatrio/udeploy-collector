/**
 * Created by bstein on 6/23/16.
 */
'use strict';
var schemas = require('./../schemas');
var _ = require('lodash');

var Component = function(data) {
    this.data = this.prepData(data);
    this.data = this.sanitize(data);
};

Component.prototype.data  = {};

Component.prototype.prepData = function(data) {
    this.data.name = data.component.name;
    this.data.version = data.version.name;
    this.data.environmentId = data.environment.environmentId;
    this.data.environmentName = data.environment.name;
    this.data.deployed = data.compliancy.desiredCount == data.compliancy.missingCount;
    this.data.asOfDate = data.date;
    return this.data;
};
Component.prototype.sanitize = function(data) {
    data = data || {};
    var schema = schemas.component;
    return _.pick(_.defaults(data,schema), _.keys(schema));
};

Component.findById = function() {

};
module.exports = Component;
