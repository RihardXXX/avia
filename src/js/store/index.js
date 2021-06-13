import api from '../services/api';
import converterData from '../utils';
import formInterface from '../view/form';
import ticketsUI from '../view/tickets';
import preloader from '../view/preloader';

const { disableBtns } = formInterface;

// api
const { getCountries, getCities, getPrices, getAirlinesInfo, getCurrency } =
  api;

getCurrency().then((res) => {});

//utils
const {
  convertedCountries,
  convertedCities,
  getCountryNameByCode,
  createListforAutocomplete,
  convertedAirlines,
  convertedTickets,
} = converterData;

//state
const state = {
  countries: null,
  cities: null,
  airlines: null,
  listForAutocomplete: null,
  tickets: null,
  ratesFromDate: null,
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

  getCurrencyRatesStart(state) {
    state.isLoading = true;
  },
  getCurrencyRatesSuccess(state, payload) {
    state.isLoading = false;
    state.ratesFromDate = payload;
  },
  getCurrencyRatesFailure(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  setListForAutocomplete(state, payload) {
    state.listForAutocomplete = payload;
  },
};

// actions list
const actions = {
  // возвращаем страны
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
  // возвращаем города
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
  // ворвращаем авиакомпании
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
  // возвращаем текущий курс валют
  getCurrencyRates({ state, mutations }) {
    return new Promise((resolve) => {
      mutations.getCurrencyRatesStart(state);
      getCurrency()
        .then((ratesFromDate) => {
          mutations.getCurrencyRatesSuccess(state, ratesFromDate);
          resolve(ratesFromDate);
        })
        .catch((error) => mutations.getCurrencyRatesFailure(error));
    });
  },
  // инициализация всех данных
  async initCountriesCities({ state, mutations }) {
    const res = await Promise.all([
      this.getCountries({ state, mutations }),
      this.getCities({ state, mutations }),
      this.getAirlines({ state, mutations }),
      this.getCurrencyRates({ state, mutations }),
    ]);
    return res;
  },
  //получение билетов и их рендер на странице
  getInfoPrices({ state, mutations, payload }) {
    return new Promise((resolve) => {
      mutations.getTicketsStart(state);
      preloader.onPreloader(true);
      disableBtns(true);
      getPrices(payload)
        .then((tickets) => {
          disableBtns(false);
          const ticketsList = convertedTickets(tickets, state, getters);
          console.log(ticketsList);
          mutations.getTicketsSuccess(ticketsList);
          preloader.onPreloader(false);
          ticketsUI.renderTickets(ticketsList);
          resolve(tickets);
        })
        .catch((err) => {
          disableBtns(false);
          preloader.onPreloader(false);
          mutations.getTicketsFailure(err);
        });
    });
  },
};

export default { state, mutations, actions, getters };
