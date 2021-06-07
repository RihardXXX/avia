import plugins from '../../plugins/';

const { getAutocompleteInstance, getDatepickerInstance } = plugins;

const formUI = (getAutocompleteInstance, getDatepickerInstance) => {
  const form = document.forms['form-location'];
  const btns = document.querySelectorAll('.btn');
  const origin = document.getElementById('autocomplete-origin');
  const destination = document.getElementById('autocomplete-destination');
  const depart = document.getElementById('depart');
  const returnD = document.getElementById('return');
  const originAutocomplete = getAutocompleteInstance(origin);
  const destinationAutocomplete = getAutocompleteInstance(destination);
  const departDatepicker = getDatepickerInstance(depart);
  const returnDatepicker = getDatepickerInstance(returnD);

  return {
    getForm: () => form,
    getBtns: () => btns,
    getOriginValue: () => origin.value,
    getDestinationValue: () => destination.value,
    getDepartValue: () => depart.value,
    getReturnValue: () => returnD.value,
    setAutocompleteShortList: function (list) {
      originAutocomplete.updateData(list);
      destinationAutocomplete.updateData(list);
    },
    disableBtns: (status) => {
      btns.forEach((btn) => (btn.disabled = status));
    },
  };
};

const formInterface = formUI(getAutocompleteInstance, getDatepickerInstance);

export default formInterface;
