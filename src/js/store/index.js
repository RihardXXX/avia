import api from '../services/api';

const { getCountries, getCities } = api;

const state = {
  countries: null,
  cities: null,
  error: null,
  isLoading: false,
};

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
};

const actions = {
  getCountries({ state, mutations }) {
    return new Promise((resolve) => {
      mutations.getCountriesStart(state);
      getCountries()
        .then((countries) => {
          mutations.getCountriesSuccess(state, countries);
          resolve(countries);
        })
        .catch((error) => mutations.getCountriesFailure(state, error));
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
