'use strict';

const fs = require('fs-promise');
const config = require('./config');
const path = require('path');
const co = require('co');

module.exports = co.wrap(function* routes(app) {
  const controllerRootUrl = config.routes.controllerRootUrl;

  let controllersFolder = path.join(__dirname, 'controllers');
  // setup routes for all controllers
  (yield fs.readdir(controllersFolder)).forEach((file) => {
    /* eslint-disable global-require */
    let currentController = require(path.join(controllersFolder, file));
    currentController.routes(app, controllerRootUrl);
    /* eslint-enable global-require */
  });
});
