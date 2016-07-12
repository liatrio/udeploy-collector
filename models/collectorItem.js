"use strict";
var _ = require('lodash'),
    schemas = require('./../ucdSchema');


var CollectorItem = function (data) {
    this.data = this.prepData(data);
    this.data = this.sanitize(data);
};

CollectorItem.prototype.data = {};

CollectorItem.prototype.prepData = function(data) {
    data.options = {};
    data.options.applicationId = data.id;
    data.options.applicationName = data.name;
    data.description = data.name;
    data.enabled = true;
    data.pushed = true;
    data.instanceUrl =  process.env.ucdUrl;
    return data;
};
CollectorItem.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.collectorItem;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = CollectorItem;

