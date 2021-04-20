'use strict';
const axios = require('axios');

const countryUrl = "https://d6wn6bmjj722w.population.io/1.0/countries"
const populationUrl = "https://d6wn6bmjj722w.population.io/1.0/population"

const getCountries = () => {
  return axios.get(`${countryUrl}`)
    .then(res => {
      const data = res.data.countries
      return {data}
    })
    .catch(err => {
      console.log('Error', err.message)
    });
} 

const getOneCountryData = (country) => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  let newdate = `${year}-${month}-${day}`;
  return axios.get(`${populationUrl}/${country}/${newdate}`)
  .then(res => {
    const data = res.data
    if (data === "") {
      return {country}
    }
    return {...data.total_population, country}
  })
  .catch(err => {
    console.log('Error', err.message)
    return {country, err:`Internal server error, failed to retrieve data for country ${country}`}
  })
}

exports.getCountries = getCountries
exports.getOneCountryData = getOneCountryData

