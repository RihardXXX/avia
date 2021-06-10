const ticketsUI = () => {
  const container = document.querySelector('.tickets-sections .row');

  const renderTickets = (tickets) => {
    clearContainer();

    if (!tickets.length) {
      showEmptyMsg();
      return;
    }
  };
  const clearContainer = () => (container.innerHTML = '');
  const showEmptyMsg = () => {
    const template = emptyMsgTemplates();
    container.insertAdjacentHTML(template);
  };
  const emptyMsgTemplates = () => {
    return `
      <div class="tickets-empty-res-msg">
        По вашему запросу ничего не найдено
      </div>`;
  };
  const ticketTemplate = () => {};

  return Object.freeze({
    renderTickets,
    clearContainer,
    showEmptyMsg,
    emptyMsgTemplates,
    ticketTemplate,
  });
};
