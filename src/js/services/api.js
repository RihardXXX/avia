import axios from 'axios';
import config from '../config/config';

const { url } = config;

// axios.defaults.baseURL = url;
// базовый общий адрес для запросов
const baseAPI = axios.create({
  baseURL: 'https://aviasales-api.herokuapp.com',
});

// адресная строка для запросов по валюте
const currencyAPI = axios.create({
  baseURL: 'https://cdn.jsdelivr.net',
});

// countries страны
// cities города
// prices/cheap
// hello
const getCountries = () =>
  baseAPI
    .get('/countries')
    .then((countries) => countries.data)
    .catch((err) => err.message);

const getCities = () =>
  baseAPI
    .get('/cities')
    .then((cities) => cities.data)
    .catch((err) => err.message);

const getAirlinesInfo = () =>
  baseAPI
    .get('/airlines')
    .then((airlines) => airlines.data)
    .catch((err) => err.message);

const getPrices = (params) =>
  baseAPI
    .get('/prices/cheap', { params })
    .then((prices) => prices.data)
    .then((prices) => prices.data)
    .catch((err) => err.message);

const getCurrency = () =>
  currencyAPI
    .get('/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
    .then((response) => response.data)
    .then((dateAndUsd) => dateAndUsd);

export default {
  getCountries,
  getCities,
  getPrices,
  getAirlinesInfo,
  getCurrency,
};
