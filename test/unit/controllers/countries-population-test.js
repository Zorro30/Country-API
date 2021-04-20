const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();

const countryHelper = require('../../../src/lib/country-helper');
const mockCountriesPopulation = require('../../fixtures/data/mock-countries-population.json');

describe('countries endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get countries', function getCountries() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/countries/population';

    it('should return a list of countries', function handleGettingCountries(done) {
      sandbox.stub(countryHelper, 'getOneCountryData').returns(new Promise(resolve => resolve(mockCountriesPopulation)));

      request(app)
      .get(`${endpointUrl}?country=India`)
      .set('accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(200);
        if (err) {
          return done(err);
        }
        return done();
      });
    });

    it('should return 400 schema error if no countries passed', function handleNoCountriesFound(done) {
      sandbox.stub(countryHelper, 'getOneCountryData').returns(new Promise(resolve => resolve([])));

      request(app)
      .get(`${endpointUrl}`)
      .set('accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
    });

    it('should return 400 schema error if wrong sort_on param passed', function handleNoCountriesFound(done) {
      sandbox.stub(countryHelper, 'getOneCountryData').returns(new Promise(resolve => resolve([])));

      request(app)
      .get(`${endpointUrl}?sort_on=countries`)
      .set('accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
    });

    it('should return 400 schema error if wrong sort param passed', function handleNoCountriesFound(done) {
      sandbox.stub(countryHelper, 'getOneCountryData').returns(new Promise(resolve => resolve([])));

      request(app)
      .get(`${endpointUrl}?sort=aesc`)
      .set('accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
    });

  }); 
});
