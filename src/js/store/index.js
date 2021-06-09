import api from '../services/api';
import converterData from '../utils';
import formInterface from '../view/form';

const { disableBtns } = formInterface;

// api
const { getCountries, getCities, getPrices, getAirlinesInfo } = api;

//utils
const {
  convertedCountries,
  convertedCities,
  getCountryNameByCode,
  createListforAutocomplete,
  convertedAirlines,
} = converterData;

//state
const state = {
  countries: null,
  cities: null,
  airlines: null,
  listForAutocomplete: null,
  tickets: null,
  error: null,
  isLoading: false,
};

const getters = {
  getAirlinesNameByCode(state, code) {
    return state.airlines[code] ? state.airlines[code].name : '';
  },
  getAirlinesLogoByCode(state, code) {
    return state.airlines[code] ? state.airlines[code].logo : '';
  },
};

// mutations list
const mutations = {
  getCountriesStart(state) {
    state.isLoading = true;
  },
  getCountriesSuccess(state, payload) {
    state.isLoading = false;
    state.countries = payload;
  },
  getCountriesFailure(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  getCitiesStart(state) {
    state.isLoading = true;
  },
  getCitiesSuccess(state, payload) {
    state.isLoading = false;
    state.cities = payload;
  },
  getCitiesFailure(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  initCountriesCitiesStart(state) {
    state.isLoading = true;
  },
  initCountriesCitiesSuccess(state, { countries, cities }) {
    state.isLoading = false;
    state.countries = countries;
    state.cities = cities;
  },
  initCountriesCitiesFailure(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  getTicketsStart(state) {
    state.isLoading = true;
  },
  getTicketsSuccess(state, payload) {
    state.isLoading = false;
    state.tickets = payload;
  },
  getTicketsFailure(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  getAirlinesStart(state) {
    state.isLoading = true;
  },
  getAirlinesSuccess(state, payload) {
    state.isLoading = false;
    state.airlines = payload;
  },
  getAirlinesFailure(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  setListForAutocomplete(state, payload) {
    state.listForAutocomplete = payload;
  },
};

// actions list
const actions = {
  getCountries({ state, mutations }) {
    return new Promise((resolve) => {
      mutations.getCountriesStart(state);
      getCountries()
        .then((countries) => {
          const countriesObject = convertedCountries(countries);
          mutations.getCountriesSuccess(state, countriesObject);
          resolve(countriesObject);
        })
        .catch((error) => mutations.getCountriesFailure(state, error));
    });
  },
  getCities({ state, mutations }) {
    return new Promise((resolve) => {
      mutations.getCitiesStart(state);
      getCities()
        .then((cities) => {
          const citiesObject = convertedCities(
            state.countries,
            cities,
            getCountryNameByCode
          );
          const shortList = createListforAutocomplete(citiesObject);
          mutations.setListForAutocomplete(state, shortList);
          mutations.getCitiesSuccess(state, citiesObject);
          resolve(citiesObject);
        })
        .catch((erros) => mutations.getCitiesFailure(state, erros));
    });
  },
  getAirlines({ state, mutations }) {
    return new Promise((resolve) => {
      mutations.getAirlinesStart(state);
      getAirlinesInfo()
        .then((air) => {
          const airlines = convertedAirlines(air);
          mutations.getAirlinesSuccess(state, airlines);
          resolve(airlines);
        })
        .catch((erros) => mutations.getAirlinesFailure(state, erros));
    });
  },
  async initCountriesCities({ state, mutations }) {
    const res = await Promise.all([
      this.getCountries({ state, mutations }),
      this.getCities({ state, mutations }),
      this.getAirlines({ state, mutations }),
    ]);
    return res;
  },
  getInfoPrices({ state, mutations, payload }) {
    return new Promise((resolve) => {
      mutations.getTicketsStart(state);
      disableBtns(true);
      getPrices(payload)
        .then((tickets) => {
          disableBtns(false);
          console.log(tickets);
          mutations.getTicketsSuccess(tickets);
          resolve(tickets);
        })
        .catch((err) => {
          disableBtns(state.isLoading);
          mutations.getTicketsFailure(err);
        });
    });
  },
};

export default { state, mutations, actions, getters };
