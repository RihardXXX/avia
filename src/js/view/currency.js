import plugins from '../../plugins/';

const currencyUI = () => {
  const currency = document.getElementById('currency');

  return {
    getcurrency: () => currency.value,
  };
};

const currency = currencyUI();

export default currency;
