import { format } from 'date-fns';

// делаем объект стран где под каждым кодом объект данных страны
const convertedCountries = (countries) => {
  // { ca: { .... } }
  return countries.reduce((acc, country) => {
    acc[country.code] = country;
    return acc;
  }, {});
};

// // получаем  имя страны по коду
const getCountryNameByCode = (countries, code) => {
  return countries[code].name;
};

const convertedCities = (countriesObject, cities, getCountryNameByCode) => {
  // { 'Boston, USA': { .... } }
  return cities.reduce((acc, city) => {
    const country_name = getCountryNameByCode(
      countriesObject,
      city.country_code
    );
    const city_name = city.name || city.name_translations.en;
    const fullName = `${city_name},${country_name}`;
    acc[city.code] = {
      ...city,
      fullName,
      country_name,
    };
    return acc;
  }, {});
};

const convertedAirlines = (airlines) => {
  return airlines.reduce((acc, item) => {
    item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
    item.name = item.name || item.name_translations.en;
    acc[item.code] = item;
    return acc;
  }, {});
};

// эта херня для автокомплита опций
const createListforAutocomplete = (citiesObject) => {
  // { 'Boston, USA': null }
  return Object.entries(citiesObject).reduce((acc, [, city]) => {
    acc[city.fullName] = null;
    return acc;
  }, {});
};

// возвращаем код города
const getCityCodeByKey = (cities, key) => {
  const city = Object.values(cities).find((item) => item.fullName === key);
  return city.code;
};

// возвращаем имя города по коду
const getCityNamebyCode = (cities, code) => {
  return cities[code].name;
};

//функция необходимая для форматирования даты
const formatDate = (str, type) => format(new Date(str), type);

// конвертируем объект с билетами в удобный формат для дальнейшей вёрстки
const convertedTickets = (tickets, state, getters) => {
  const { getAirlinesLogoByCode, getAirlinesNameByCode } = getters;
  return Object.values(tickets).map((ticket) => {
    const origin_name = getCityNamebyCode(state.cities, ticket.origin);
    const destination_name = getCityNamebyCode(
      state.cities,
      ticket.destination
    );
    const airline_logo = getAirlinesLogoByCode(state, ticket.airline);
    const airline_name = getAirlinesNameByCode(state, ticket.airline);
    const departure_at = formatDate(ticket.departure_at, 'dd MMM yyyy H:mm');
    const return_at = formatDate(ticket.return_at, 'dd MMM yyyy H:mm');
    return {
      ...ticket,
      origin_name,
      destination_name,
      airline_logo,
      airline_name,
      departure_at,
      return_at,
    };
  });
};

export default {
  convertedCountries,
  convertedCities,
  getCountryNameByCode,
  createListforAutocomplete,
  getCityCodeByKey,
  convertedAirlines,
  getCityNamebyCode,
  convertedTickets,
};
