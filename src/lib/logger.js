'use strict';

const bunyan = require('bunyan');
const config = require('../config');
const pjson = require('../../package.json');

let streams = [];

if (config.logging.stdout.enabled) {
  streams.push({
    stream: process.stdout,
    level: config.logging.stdout.level
  });
}

function logger() {
  return bunyan.createLogger({
    name: `${pjson.name} Service`,
    serializers: bunyan.stdSerializers,
    streams: streams
  });
}

module.exports = logger;
