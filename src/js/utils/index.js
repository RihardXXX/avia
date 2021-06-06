// конвертер стран и городов из массива в объекты

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
    const key = `${city_name},${country_name}`;
    acc[key] = city;
    return acc;
  }, {});
};

// эта херня для автокомплита опций
const createListforAutocomplete = (citiesObject) => {
  // { 'Boston, USA': null }
  return Object.entries(citiesObject).reduce((acc, [key]) => {
    acc[key] = null;
    return acc;
  }, {});
};

// возвращаем код города
const getCityCodeByKey = (cities, key) => cities[key].code;

export default {
  convertedCountries,
  convertedCities,
  getCountryNameByCode,
  createListforAutocomplete,
  getCityCodeByKey,
};
