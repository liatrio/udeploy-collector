"use strict";
var http = require('http'),
    Promise = require('promise'),
    _ = require('lodash'),
    moment = require('moment'),
    requestify = require('requestify'),
    UcdComponent = require('./models/component'),
    EnvironmentStatus = require('./models/environmentStatus'),
    EnvironmentComponent = require('./models/environmentComponent'),
    applicationUrl = "rest/deploy/application/",
    ucdServer = process.env.ucdUrl || 'localhost:8080',
    authToken = process.env.authToken,
    component = require('./models/component'),
    Environment = require('./models/environment'),
    CollectorItem = require('./models/collectorItem'),
    Ucd = function () {};


Ucd.prototype.collect = function (applications) {
    var obj = this;
    return Promise.all(
        _.map(applications, function (application, applicationId) {
            console.log(applicationId);
            return obj.getEnvironmentsForApplication(applicationId).then(function (environments) {
                return Promise.all(
                    _.map(environments, function (environment) {
                        return obj.getEnvironmentComponentsAndEnvironmentStatuses(applicationId, environment.data);
                    })
                ).then(function(components) {
                    var environmentStatuses = [];
                    var environmentComponents = [];
                    _.each(components,function(component) {
                        environmentComponents = _.concat(component.components, environmentComponents);
                        environmentStatuses = _.concat(component.statuses, environmentStatuses);
                    });
                    var saveObj = [
                        { document: "environment_components", data: environmentComponents },
                        { document: "environment_status", data: environmentStatuses }
                    ];
                    return Promise.resolve(saveObj);
                });
            });
        })
    );
};
Ucd.prototype.getCollectorItems = function (collector) {
    var applications = [];
    return makeUcdGetRequest("cli/" + "application").then(function (response) {
        _.each(response.getBody(), function (application) {
            application.collectorId = collector._id;
            var app = new CollectorItem(application);
            app.data.options.instanceUrl = ucdServer;
            console.log("application Name", app.data.options.applicationName);
            if(app.data.options.applicationName == 'AEM')
                applications.push(app);
        });
        return Promise.resolve(applications);
    }).catch(function (err) {
        console.log(err);
        return Promise.reject("Unable to get collector Items");
    });
};

Ucd.prototype.getEnvironmentsForApplication = function (applicationId) {
    var environments = [];
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return makeUcdGetRequest(applicationUrl + applicationId + "/environments/false").then(function (response) {
        _.each(response.getBody(), function (environment) {
            environments.push(new Environment(environment));
        });
        return Promise.resolve(environments);
    }).catch(function (err) {
        console.log("Request failed");
        console.log(err);
        return Promise.fail("fail");
    });
};
Ucd.prototype.getComponentsInEnvironment = function (application, environment) {
    var components = [];
    return makeUcdGetRequest("rest/deploy/environment/" + environment.id + "/latestDesiredInventory").then(function (response) {
        _.each(response.getBody(), function (inventory) {

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
    }).catch(function (err) {
        console.log("Request failed");
        console.log(err);
        return Promise.reject("fail");
    });
};
Ucd.prototype.getEnvironmentComponentsAndEnvironmentStatuses = function (applicationId, environment) {
    return makeUcdGetRequest("rest/deploy/environment/" + environment.id + "/latestDesiredInventory").then(function (response) {
        var environmentComponents = [];
        var environmentStatuses = [];
        _.each(response.getBody(), function (component) {
            var isOnlineAndDeployed = component.compliancy.missingCount == 0;
            component.environmentUrl = ucdServer + "/#environment/" + component.environment.id;
            component.asOfDate = moment.now();
            component.collectorItemId = applicationId;
            component.deployed = isOnlineAndDeployed;
            component.online = isOnlineAndDeployed;
            environmentComponents.push(new EnvironmentComponent(component));
            environmentStatuses.push(new EnvironmentStatus(component));
        });
        return Promise.resolve({components: environmentComponents, statuses: environmentStatuses});
    });
};

Ucd.prototype.getEnvironmentResourceStatusData = function (data) {
    if (_.isEmpty(data) || !_.isString())
        throw new Error("Missing Required fields: ");

    var application = data.application;
    var environment = data.environment;
    var environmentStatuses = [];

    var componentInformationPath = "rest/deploy/environment/" + environment.id + "/latestDesiredInventory";
    return makeUcdGetRequest(componentInformationPath).then(function (response) {
        _.each(response.getBody(), function (component) {
            var status = new UcdComponent(component);
            environmentStatuses.push(status);
        });
        //console.log(environmentStatuses);
        return Promise.resolve(environmentStatuses);
    }).catch(function (err) {
        console.log("Request failed");
        console.log(err);
        return Promise.reject("fail");
    });

};
Ucd.prototype.getServers = function () {
    var ucdServers = [];
    ucdServers[0] = ucdServer;
    return ucdServers;
};

var makeUcdGetRequest = function (path) {
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
    return requestify.request(requestUrl, ucdApplicationRequest);
};

module.exports = Ucd;