const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Country Population Service",
            version: '1.0',
            description: "API's to get population data"
        },
        openapi: '3.0.2'
    },
    apis: [
        path.resolve(`${__dirname.replace('/swagger', '')}/controllers/countries/index.js`),
        // path.resolve(`${__dirname.replace('/swagger', '')}/routes/v1.0/fileJob.js`)
    ],
};

module.exports = swaggerJSDoc(swaggerOptions)
