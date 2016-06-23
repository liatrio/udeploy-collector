"use strict";
var schemas = require('./../schemas');
var _ = require('lodash');


var Environment = function(data) {
    this.data = this.sanitize(data);
};

Environment.prototype.data = {};

Environment.getById = function(id) {

};

Environment.prototype.sanitize = function(data) {
    data = data || {};
    var schema = schemas.environment;
    return _.pick(_.defaults(data,schema), _.keys(schema));
};

module.exports = Environment;
