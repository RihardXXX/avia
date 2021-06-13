const ticketsUI = () => {
  const container = document.querySelector('.tickets-sections .row');

  const renderTickets = (tickets) => {
    clearContainer();
    if (!tickets.length) {
      showEmptyMsg();
      return;
    }
    let fragments = '';
    tickets.forEach((ticket) => {
      const template = ticketTemplate(ticket);
      fragments += template;
    });
    container.insertAdjacentHTML('afterbegin', fragments);
  };

  const clearContainer = () => (container.innerHTML = '');

  const showEmptyMsg = () => {
    const template = emptyMsgTemplates();
    container.insertAdjacentHTML('afterbegin', template);
  };

  const emptyMsgTemplates = () => {
    return `
      <div class="tickets-empty-res-msg">
        По вашему запросу ничего не найдено
      </div>`;
  };

  const ticketTemplate = (ticket) => {
    return `
    <div class="col s12 m12">
    <div class="card">
      <div class="card-image">
        <img src="${ticket.airline_logo}" />
      </div>
      <div class="card-content">
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <i class="large material-icons">subtitles</i>
              <b>${ticket.airline_name}</b>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="large material-icons">flight_takeoff</i>
              <span class="badge blue">откуда:</span><b>${ticket.origin_name}</b>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="large material-icons">flight_land</i>
              <span class="badge blue">куда:</span><b>${ticket.destination_name}</b>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="large material-icons">date_range</i>
              <span class="badge blue">дата и время:</span><b>${ticket.departure_at}</b>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
            <i class="large material-icons">attach_money</i>
              <span class="badge blue">стоимость:</span><b>$${ticket.price} || ₽${ticket.priceRub}</b>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="large material-icons">directions_transit</i>
              <span class="badge blue">пересадок:</span><b>${ticket.transfers}</b>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="large material-icons">flight</i>
              <span class="badge blue">номер рейса:</span><b>${ticket.flight_number}</b>
            </div>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <a href="#"
          >Сюда мы в будущем затолкаем ссылку на страницу авиакомпании
        </a>
      </div>
    </div>
  </div>
    `;
  };

  return Object.freeze({
    renderTickets,
    clearContainer,
    showEmptyMsg,
    emptyMsgTemplates,
    ticketTemplate,
  });
};

const tickets = ticketsUI();

export default tickets;
