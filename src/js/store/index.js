import api from '../services/api';
import converterData from '../utils';

// api
const { getCountries, getCities } = api;

//utils
const {
  convertedCountries,
  convertedCities,
  getCountryNameByCode,
  createListforAutocomplete,
} = converterData;

//state
const state = {
  countries: null,
  cities: null,
  listForAutocomplete: null,
  tickets: null,
  error: null,
  isLoading: false,
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
    state.isLoading = true
  },
  getTicketsSuccess(state, payload) {
    state.isLoading = false
    state.tickets = payload;
  },
  getTicketsFailure(state, payload) {
    state.isLoading = false
      state.error = payload;
  }

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
  async initCountriesCities({ state, mutations }) {
    const res = await Promise.all([
      this.getCountries({ state, mutations }),
      this.getCities({ state, mutations }),
    ]);
    return res;
  },
};

export default {
  state,
  mutations,
  actions,
};
