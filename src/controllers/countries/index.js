'use strict';

const controller = require('./countries.controller');

function routes(app, rootUrl) {
  // include api version number
  let fullRootUrl = rootUrl + '/v1';

  /**
   * @swagger
   * components:
   *   schemas:
   *     CountriesResponse:
   *       type: array
   *       items: 
   *         type: string
   *       example:
   *         data: ["India", "Sri Lanka", "Australia"]
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     CountryPopulationObject:
   *       type: object
   *       properties:
   *         country:
   *           type: string
   *         population:
   *           type: integer
   *         date:
   *           type: string
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     CountryPopulationResponse:
   *       type: array
   *       items:
   *         $ref: "#/components/schemas/CountryPopulationObject"
   *       example:
   *         data: {"data":[{"date":"2021-04-20","population":4628759943,"country":"ASIA"},{"date":"2021-04-20","population":37049860,"country":"Afghanistan"}]}
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     BadRequestObject:
   *       type: object
   *       required:
   *         - message
   *       properties:
   *         message:
   *           type: string
   *       example:
   *         message: 'Error'
   */

  /**
   * @swagger
   * paths:
   *   /api/v1/countries:
   *     get:
   *       description: "Get all the countries"
   *       summary: "This API helps in fetching all the countries available."
   *       operationId: getCountries
   *       tags:
   *       - Country API
   *       responses:
   *          200:
   *            description: Success
   *            content: 
   *              application/json:
   *                schema:
   *                  $ref: "#/components/schemas/CountriesResponse"
   *          400:
   *            description: Failed
   *            content: 
   *              application/json:
   *                schema:
   *                  $ref: "#/components/schemas/BadRequestObject"
   */
  app.get({ url: fullRootUrl + '/countries' },
    controller.getCountries);

  /**
   * @swagger
   * paths:
   *   /api/v1/countries/population:
   *     get:
   *       description: "Get Population of respective countries."
   *       summary: "This API allows to get population of respective countries with additional sort features."
   *       operationId: getCountriesPopulation
   *       tags:
   *       - Country API
   *       parameters:
   *       - name: country
   *         in: query
   *         description: Name of the country whose population is to be retrieved.
   *         required: true
   *         schema:
   *           type: array
   *           items:
   *             type: string
   *       - name: sort_on
   *         in: query
   *         description: Key on which the user want to sort the response.
   *         required: false
   *         schema:
   *           type: string
   *           default: country
   *       - name: sort
   *         in : query
   *         description: Order in which the user want to sort the response.
   *         required: false
   *         schema:
   *           type: string
   *           default: asc
   *       responses:
   *          200:
   *            description: Success
   *            content: 
   *              application/json:
   *                schema:
   *                  $ref: "#/components/schemas/CountryPopulationResponse"
   *          400:
   *            description: Failed
   *            content: 
   *              application/json:
   *                schema:
   *                  $ref: "#/components/schemas/BadRequestObject"
   * 
   */
  app.get({ url: fullRootUrl + '/countries/population' },
    controller.getCountriesPopulation);
}

module.exports = {
  routes: routes
};
