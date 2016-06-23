"use strict";
var schemas = require('./../schemas');
var _ = require('lodash');

var Application = function(data) {
    this.data = this.sanitize(data);
};
Application.prototype.data = {};


Application.prototype.getInstanceUrl =  function() {
    return this.data.instanceUrl;
};
Application.prototype.getInstanceUrl = function(data) {
    this.data.instanceUrl = data.instanceUrl;
};
Application.prototype.sanitize = function(data) {
    data = data || {};
    var schema = schemas.application;
    return _.pick(_.defaults(data,schema), _.keys(schema));
};


Application.findById = function(id) {

};

module.exports =  Application;
