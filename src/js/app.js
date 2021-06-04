import store from './store/index';
import '../plugins';
import '../css/style.css';

const { state, mutations, actions } = store;

document.addEventListener('DOMContentLoaded', function () {
  actions
    .getCountries({ state, mutations })
    .then((countries) => console.log(state));
});
