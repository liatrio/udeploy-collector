/**
 * Created by bstein on 6/23/16.
 */
'use strict';
var schemas = require('./../schemas');
var _ = require('lodash');

var Component = function(data) {
    this.data = this.sanitize()
};

Component.prototype.data  = {};


Component.prototype.sanitize = function(data) {
    data = data || {};
    var schema = schemas.component;
    return _.pick(_.defaults(data,schema), _.keys(schema));
}

Component.findById = function() {

};
module.exports = Component;
