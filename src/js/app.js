import store from './store/index';
import '../plugins';
import '../css/style.css';
import formInterface from '../js/view/form';
import popup from '../js/view/popup';
import favoriteUI from '../js/view/favorite';
import utils from './utils';
// import currency from '../js/view/currency';

const { state, mutations, actions, isLoading, getters } = store;

// заталкиваем избранные билеты с локалсториджа
// state.listFavorites = utils.getItem('listFavorites');

// console.log(favoriteUI);

document.addEventListener('DOMContentLoaded', function () {
  // init store
  actions.initCountriesCities({ state, mutations }).then(() => {
    const { countries, cities, listForAutocomplete, error, isLoading } = state;
    const { getCityCodeByKey, chooseFavorite } = utils;
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

    // слежка за событиями добавить избранное и удалить
    // chooseFavorite(state.tickets, state);

    // обработчик событий для отправки формы на сервер экшен запускает
    getForm().addEventListener('submit', (e) => {
      e.preventDefault();
      // собраем данные с формы
      try {
        const data = onFromSubmit();
        // console.log(data);
        actions
          .getInfoPrices({ state, mutations, payload: data })
          .then((ticketsList) => {
            chooseFavorite(ticketsList, state);
          });
      } catch (error) {
        console.log('не все поля заполнены');
        popup.getPopup().open();
      }
    });

    // слежка за кнопкой список избранных при нажатие на избранное
    const listFavorite = document.querySelector('.list-favorite');
    listFavorite.addEventListener('click', (e) => {
      if (e.target.style.backgroundColor === 'rgb(20, 56, 53)') {
        e.target.style.backgroundColor = '#26a69a';
      } else {
        e.target.style.backgroundColor = '#143835';
      }
      // из локалсториджа грузим данные в стейт
      state.listFavorites = utils.getItem('listFavorites');
      // рендерим их на страницу
      favoriteUI().renderFavorites(state.listFavorites);
      // подвешиваем обработчики событий для кнопки удалить
      chooseFavorite(state.listFavorites, state);
    });

    // сбор данных с инпутов
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
    console.log(state);
    // console.log(countries);
    // console.log(cities);
  });
});
