import store from './store/index';
import '../plugins';
import '../css/style.css';
import formInterface from '../js/view/form';
import utils from './utils';

const { state, mutations, actions } = store;
const { getCityCodeByKey } = utils;

document.addEventListener('DOMContentLoaded', function () {
  // init store
  actions.initCountriesCities({ state, mutations }).then(() => {
    const { countries, cities, listForAutocomplete, error, isLoading } = state;
    const {
      getForm,
      setAutocompleteShortList,
      getOriginValue,
      getDestinationValue,
      getDepartValue,
      getReturnValue,
      disableBtns,
    } = formInterface;

    //  устанавливаем в объект автокомплит список городов
    setAutocompleteShortList(listForAutocomplete);

    // обработчик событий дл отправки формы
    getForm().addEventListener('submit', (e) => {
      e.preventDefault();
      // собраем данные с формы
      const data = onFromSubmit();
      console.log(data);
      // кнопки отключаем
      disableBtns();
    });

    // отправка формы на сервер функция
    function onFromSubmit() {
      // собираем данные из инпутов
      const origin = getCityCodeByKey(cities, getOriginValue());
      const destination = getCityCodeByKey(cities, getDestinationValue());
      const depart_date = getDepartValue();
      const returnD = getReturnValue();
      // формат отправки на сервер
      // origin: code, destination: code, date: 2019-09, date: 2019-10
      return {
        origin,
        destination,
        depart_date,
        returnD,
      };
    }

    // console.log(state);
    // console.log(countries);
    console.log(cities);
  });
});
