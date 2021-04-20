"use strict";

const co = require("co");
const errors = require("restify-errors");
const countryHelper = require("../../lib/country-helper");
const axios = require("axios");
const _ = require("lodash");
const AJV = require("ajv");
const {
  countriesPopulationSchema,
} = require("../../schema/getCountriesPopulation.js");

exports.getCountries = co.wrap(function* getCountries(req, res, next) {
  try {
    countryHelper
      .getCountries()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => console.log(error));
    return next();
  } catch (err) {
    return next(
      new errors.InternalServerError(err, "Server error retrieving countries.")
    );
  }
});

exports.getCountriesPopulation = co.wrap(function* getOneCountry(req, res, next) 
{
  try {
    const { query } = req;

    // if only one country is passed convert it to array and then process it.
    if (typeof query.country == "string") {
      query.country = [query.country];
    }
    const validator = new AJV().compile(countriesPopulationSchema);
    const check = validator(query);
    if (!check) {
      res.status(400); // used the default status instead of restify errors to make the response verbose which can help in fixing the validation errors.
      res.json(validator.errors[0]);
    }
    const countries = query.country;
    const sortOn = query.sort_on || "country";
    const sort = query.sort || "asc";
    if (!countries) {
      res.json({});
    }
    const tasks = countries.map((ele) => {
      return countryHelper.getOneCountryData(ele);
    });
    Promise.all(tasks)
      .then((result) => {
        result = result.filter((ele) => ele.population); // to filter out empty response, when no country data found.
        result = _.orderBy(result, [sortOn], [sort]);
        res.json({data:result});
      })
      .catch((err) => {
        console.log(err);
      });

    return next();
  } catch (err) {
    return next(
      new errors.InternalServerError(err, "Server error retrieving countries.")
    );
  }
});
