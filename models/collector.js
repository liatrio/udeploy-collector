"use strict";
var _ = require('lodash'),
    schemas = require('./../ucdSchema');


var Collector = function (data) {
    this.data = this.sanitize(data);
};

Collector.prototype.data = {};

Collector.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.collector;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = Collector;

