"use strict";
var schemas = require('./../ucdSchema'),
    _ = require('lodash');


var Application = function (data) {
    this.data = this.prepData(data);
    this.data = this.sanitize(data);
};
Application.prototype.data = {};

Application.prototype.prepData = function (data) {

};
Application.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.application;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

module.exports = Application;
