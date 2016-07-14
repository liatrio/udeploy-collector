"use strict";

var CronJob = require('cron').CronJob,
    Collector = require('./collector');

    new CronJob('10 * * * *', function() {
        console.log("Start collecting");
        new Collector().collectAndSave();

    }, null, true, 'America/Los_Angeles');