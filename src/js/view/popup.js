import plugins from '../../plugins/';

const { getPopupInstance } = plugins;

const popupUI = (getPopupInstance) => {
  const popupElem = document.querySelector('.modal');
  const popup = getPopupInstance(popupElem);

  return {
    getPopup: () => popup,
  };
};

const popup = popupUI(getPopupInstance);

export default popup;
