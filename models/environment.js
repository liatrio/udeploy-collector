"use strict";
var _ = require('lodash'),
    schemas = require('./../ucdSchema');


var Environment = function (data) {
    this.data = this.sanitize(data);
};
Environment.prototype.data = {};
Environment.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.environment;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = Environment;
