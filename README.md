[![Build Status](https://travis-ci.org/liatrio/udeploy-collector.svg?branch=master)](https://travis-ci.org/liatrio/udeploy-collector)


### What is the udeploy collector for?

**udeploy-collector** is for collecting the statuses of applications in IBM Urban code deploy instances and read by and instance of [Capital One's Hygieia dashboard](https://github.com/capitalone/Hygieia).

Hygieia comes with a udeploy collector, but it relies on Urban Code Deploy instances to be setup in a specific way. We needed to rewrite the collector to fit how we've seen udeploy setup. Decided that it made more sense for collectors to be in their own repos since not everyone will use every collector. Since Hygieia uses mongo, Nodejs appeared to be the perfect route.  


To use:

        npm install --production
        node server.js


 To develop, use in dev mode.

        npm install
        node server.js
Tests:
  Run all unit tests with

        npm test


 ![alt text](./images/interaction.png)
