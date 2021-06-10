import store from './store/index';
import '../plugins';
import '../css/style.css';
import formInterface from '../js/view/form';
import popup from '../js/view/popup';
import utils from './utils';
// import currency from '../js/view/currency';

const { state, mutations, actions, isLoading, getters } = store;

document.addEventListener('DOMContentLoaded', function () {
  // init store
  actions.initCountriesCities({ state, mutations }).then(() => {
    const { countries, cities, listForAutocomplete, error, isLoading } = state;
    const { getCityCodeByKey } = utils;
    const {
      getForm,
      setAutocompleteShortList,
      getOriginValue,
      getDestinationValue,
      getDepartValue,
      getReturnValue,
    } = formInterface;

    //  устанавливаем в объект автокомплит список городов
    setAutocompleteShortList(listForAutocomplete);

    // обработчик событий дл отправки формы
    getForm().addEventListener('submit', (e) => {
      e.preventDefault();
      // собраем данные с формы
      try {
        const data = onFromSubmit();
        // console.log(data);
        actions.getInfoPrices({ state, mutations, payload: data });
      } catch (error) {
        console.log('не все поля заполнены');
        popup.getPopup().open();
      }
    });

    // отправка формы на сервер функция
    function onFromSubmit() {
      // собираем данные из инпутов
      const origin = getCityCodeByKey(cities, getOriginValue());
      const destination = getCityCodeByKey(cities, getDestinationValue());
      const depart_date = getDepartValue();
      const returnD = getReturnValue();
      // const currency = currency.getcurrency();
      // формат отправки на сервер
      // origin: code, destination: code, date: 2019-09, date: 2019-10
      return {
        origin,
        destination,
        depart_date,
        returnD,
        // currency,
      };
    }

    // console.log(state);
    // console.log(countries);
    // console.log(cities);
  });
});
