'use strict';

const config = require('./config');
const restify = require('restify');
const plugins = require('restify-plugins');
const argv = require('yargs').argv;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-restify');
const logger = require('./lib/logger')();

let port = argv.port || process.env.PORT || config.port || 3000;
let environment = process.env.NODE_ENV || 'dev';

let pjson = require('../package.json');
const countries = require('./controllers/countries');

let app = restify.createServer({
  name: pjson.name,
  version: pjson.version,
  log: logger
});

app.acceptable = config.accept;
app.use(plugins.acceptParser(app.acceptable));
app.use(plugins.authorizationParser());
app.use(plugins.queryParser());
app.use(plugins.bodyParser());
app.use(plugins.requestLogger());

// Bootstrap routes
require('./routes')(app);

app.on('after', plugins.auditLogger({
  log: logger
}));


const swaggerOptions = {
  swaggerDefinition: {
      info: {
          title: "Country Population Service",
          version: '1.0',
          description: "API's to serve users to fetch population data of respective countries."
      },
      servers: [
        { url: "http://localhost:3000",
          description: 'Development server',
      }
      ],
      openapi: '3.0.2'
  },
  apis: [
      './src/controllers/countries/index.js',
  ],
};



const specs = swaggerJSDoc(swaggerOptions)
app.get('/docs', swaggerUi.setup(specs));
app.get('/*', ...swaggerUi.serve)

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});


// Start listening
app.listen(port, () => {
  logger.info('Country Comparison API ' + environment + ' started listening on ' + port);
});

// Log exception and exit the process if an unhandled exception occurs.
// Don't exit on error if in env=test
if (process.env.NODE_ENV !== 'test') {
  process.on('uncaughtException', (err) => {
    /* eslint-disable no-console */
    console.error('Unhandled exception. Exiting process.' + err);
    /* eslint-enable no-console */
    logger.fatal('Unhandled exception. Exiting process.' + err);
    process.exit(1);
  });
}
// Expose
module.exports = app;
