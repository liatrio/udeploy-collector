"use strict";
var _ = require('lodash'),
    schemas = require('./../ucdSchema');


var EnvironmentStatus = function (data) {
    this.data = this.sanitize(data);
};
EnvironmentStatus.prototype.data = {};
EnvironmentStatus.prototype.prepData = function (data) {
    data.environmentName = data.environment.name;
    data.componentName = data.component.name;
    return data;
};
EnvironmentStatus.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.environmentStatus;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = EnvironmentStatus;
