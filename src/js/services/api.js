import axios from 'axios';
import config from '../config/config';

const { url } = config;

axios.defaults.baseURL = url;

// countries страны
// cities города
// prices/cheap
// hello
const getCountries = () =>
  axios
    .get('/countries')
    .then((countries) => countries.data)
    .catch((err) => err.message);

const getCities = () =>
  axios
    .get('/cities')
    .then((cities) => cities.data)
    .catch((err) => err.message);

const getPrices = (params) =>
  axios
    .get('/prices/cheap', { params })
    .then((prices) => prices.data)
    .catch((err) => err.message);

export default {
  getCountries,
  getCities,
  getPrices,
};
