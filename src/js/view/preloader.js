const preloaderUI = () => {
  const container = document.querySelector('.tickets-sections .row');
  const preloader = `<div class="progress">
                      <div class="indeterminate"></div>
                    </div>`;

  const onPreloader = (flag) =>
    flag
      ? container.insertAdjacentHTML('afterbegin', preloader)
      : (container.innerHTML = '');

  return Object.freeze({ onPreloader });
};

const preloader = preloaderUI();

export default preloader;
