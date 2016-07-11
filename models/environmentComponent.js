"use strict";
var _ = require('lodash'),
    schemas = require('./../ucdSchema');


var EnvironmentComponent = function (data) {
    this.data = this.prepData(data);
    this.data = this.sanitize(data);
};
EnvironmentComponent.prototype.data = {};
EnvironmentComponent.prototype.prepData = function (data) {
    data.environmentName = data.environment.name;
    data.componentName = data.component.name;
    data.componentVersion = data.version.name;
    data.deployed = true;
    data.deployTime = data.date;
    return data;
};
EnvironmentComponent.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.environmentComponents;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = EnvironmentComponent;
