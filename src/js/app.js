import api from './services/api';

const { getCountries, getCities } = api;

getCountries().then((countries) => console.log(countries));
