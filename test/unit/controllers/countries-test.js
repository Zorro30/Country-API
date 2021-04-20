const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();

const countryHelper = require('../../../src/lib/country-helper');
const mockCountries = require('../../fixtures/data/mock-countries.json');

describe('countries endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get countries', function getCountries() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/countries';

    it('should return a list of countries', function handleGettingCountries(done) {
      sandbox.stub(countryHelper, 'getCountries').returns(new Promise(resolve => resolve(mockCountries)));

      request(app)
      .get(`${endpointUrl}`)
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

    it('should return empty array if no countries found', function handleNoCountriesFound(done) {
      sandbox.stub(countryHelper, 'getCountries').returns(new Promise(resolve => resolve([])));

      request(app)
      .get(`${endpointUrl}`)
      .set('accept', 'application/json')
      .expect(200, [])
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
    });

    it('should return 500 if error getting countries', function handleErrorGettingCountries(done) {
      const error = new Error('fake error');
      sandbox.stub(countryHelper, 'getCountries').throws(error);

      request(app)
      .get(`${endpointUrl}`)
      .set('accept', 'application/json')
      .expect(500)
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
    });
  });
});
