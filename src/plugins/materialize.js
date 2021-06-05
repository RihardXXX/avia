import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// init select materialize
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

// функция возвращающая объект для работы с селектами
export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

// init autocomplete materialize
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

// функция возаращающая объект для работы с автозаполнениями
export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

// инициализация инпутов даты отправки и возврата
const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {
  showClearBtn: true,
});

export function getDatepickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}
