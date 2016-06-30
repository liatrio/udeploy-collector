"use strict";
var http = require('http');
var Promise = require('promise');
var _ = require('lodash');
var requestify = require('requestify');
var UcdComponent = require('./models/component');

var applicationUrl = "rest/deploy/application/";
var ucdServer = process.env.ucdUrl || 'localhost:8080';
var authToken = process.env.authToken;
var Ucd =  function() {};



Ucd.prototype.getEnvironmentsForApplication = function(applicationId) {
    var environments = [];
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return makeUcdGetRequest(applicationUrl + applicationId + "/environments/false").then( function(response) {
        _.each(response.getBody(), function(environment) {
            environments.push(environment.name);
        });
        return Promise.resolve(environments);
    }).catch(function(err) {
        console.log("Request failed");
        console.log(err);
        return Promise.fail("fail");
    });
};

Ucd.prototype.getApplications = function() {
    var applications = [];
    return makeUcdGetRequest("cli/" + "application").then(function(response) {
        _.each(response.getBody(), function(application) {
            var ucdApplication = {};
            ucdApplication.name = application.name;
            ucdApplication.id = application.id;
            ucdApplication.instanceUrl = ucdServer;
            applications.push(ucdApplication);
        });
        return Promise.resolve(applications);
    }).catch(function(err) {
        console.log("Request failed");
        console.log(err);
        return Promise.reject("fail");
    });
};
Ucd.prototype.getComponentsInEnvironment = function(application, environment) {
    var components = [];
    return makeUcdGetRequest("rest/deploy/environment/" + environment.id + "/latestDesiredInventory").then(function(response) {
        _.each( response.getBody() , function(inventory) {
            var component = {};
            component.environmentId = environment.id;
            component.environmentName = environment.name;
            component.environmentUrl = application.instanceUrl || ucdServer + "/#environment/" + environment.id;
            component.id = inventory.component.id;
            component.name = inventory.component.name;
            component.version = inventory.version.name;
            component.deployed = inventory.compliancy.desiredCount;
            component.date = inventory.date;
            components.push(component);
        });
        return Promise.resolve(components);
    }).catch(function(err) {
        console.log("Request failed");
        console.log(err);
        return Promise.reject("fail");
    });
};

Ucd.prototype.getEnvironmentResourceStatusData = function(data) {
    if(_.isEmpty(data) || !_.isString())
        throw new Error("Missing Required fields: ");

        var application = data.application;
    var environment = data.environment;
    var environmentStatuses = [];

    var componentInformationPath = "rest/deploy/environment/" + environment.id + "/latestDesiredInventory";
    return makeUcdGetRequest(componentInformationPath).then(function(response) {
        _.each(response.getBody(),function(component) {
            var status = new UcdComponent(component);
            environmentStatuses.push(status);
        });
        console.log(environmentStatuses);
        return Promise.resolve(environmentStatuses);
    }).catch(function(err) {
        console.log("Request failed");
        console.log(err);
        return Promise.reject("fail");
    });

};

var makeUcdGetRequest = function(path) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var ucdApplicationRequest = {
        method: 'GET',
        headers: {
            Authorization: authToken,
            rejectUnauthorized: false,
            requestCert: true,
            dataType: 'json'
        }
    };
    var requestUrl = ucdServer + path;
    console.log("Request Url: " + requestUrl);
    return requestify.request(requestUrl, ucdApplicationRequest);
};

module.exports = new Ucd();