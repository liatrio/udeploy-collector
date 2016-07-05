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
        _id: null,
        description: null,
        enabled: null,
        pushed: null,
        collectorId: null
    },
    collector: {
        _id: null,
        udeployServers : null,
        name: null,
        collectorType: null,
        enabled: null,
        online: null,
        lastExecuted: null
    },
    environmentStatus: {
        _id: null,
        collectorItemId: null,
        environmentName: null,
        componentName: null,
        online: null
    }
};

module.exports = schemas;