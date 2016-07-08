"use strict";
var _ = require('lodash'),
    schemas = require('./../ucdSchema');


var EnvironmentComponent = function (data) {
    this.data = this.sanitize(data);
};
EnvironmentComponent.prototype.data = {};
EnvironmentComponent.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.environmentComponent;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = EnvironmentComponent;
