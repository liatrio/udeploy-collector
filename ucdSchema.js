schemas = {
    environment: {
        name: null,
        id: null,
        components: null
    },
    component: {
        id: null,
        componentName: null,
        version: null,
        collectorItemId: null,
        environmentId: null,
        environmentName: null,
        environmentUrl: null,
        deployed: false,
        asOfDate: null
    },
    application: {
        name: null,
        id: null,
        instanceUrl: null,
        environments: null
    },
    collectorItem : {
        description: null,
        enabled: null,
        pushed: null,
        collectorId: null,
        lastUpdated: null,
        options: {
            applicationId: null,
            applicationName: null,
            instanceUrl: null
        }
    },
    collector: {
        udeployServers : null,
        name: null,
        collectorType: null,
        enabled: null,
        online: null,
        lastExecuted: null
    },
    environmentStatus: {
        collectorItemId: null,
        environmentName: null,
        componentName: null,
        online: null
    },
    environmentComponent: {
        collectorItemId: null,
        environmentName: null,
        environmentUrl: null,
        componentName: null,
        componentVersion: null,
        deployed: null,
        deployTime: null,
        asOfDate: null
    }
};

module.exports = schemas;