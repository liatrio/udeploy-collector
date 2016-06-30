"use strict";
var http = require('http'),
    Promise = require('promise'),
    _ = require('lodash'),
    requestify = require('requestify'),
    UcdComponent = require('./models/component'),
    applicationUrl = "rest/deploy/application/",
    ucdServer = process.env.ucdUrl || 'localhost:8080',
    authToken = process.env.authToken,
    ucdApplication = require('./models/application'),
    component = require('./models/component'),
    environment = require('./models/environment'),
    Ucd =  function() {};



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
            var app = new ucdApplication(application);
            console.log(app);
            applications.push(app);
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