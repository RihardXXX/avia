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
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${ticket.airline_name}1111</span
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <span class="ticket-city">${ticket.destination_name}</span>
            <i class="medium material-icons">flight_land</i>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">$${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
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
