"use strict";


var Application = function(data) {
    this.data = data;
};
Application.prototype.data = {};


Application.prototype.getInstanceUrl =  function() {
    return this.data.instanceUrl;
};
Application.prototype.getInstanceUrl = function(data) {
    this.data.instanceUrl = data.instanceUrl;
};

Application.findById = function(id) {

};

module.exports =  Application;
