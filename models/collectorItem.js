"use strict";
var _ = require('lodash'),
    schemas = require('./../ucdSchema');


var CollectorItem = function (data) {
    this.data = this.sanitize(data);
};

CollectorItem.prototype.data = {};

CollectorItem.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.component;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = CollectorItem;

