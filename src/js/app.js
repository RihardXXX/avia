import store from './store/index';

const { state, mutations, actions } = store;

actions
  .getCountries({ state, mutations })
  .then((countries) => console.log(state));
