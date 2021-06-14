const favoriteUI = () => {
  const container = document.querySelector('.tickets-sections .row');

  // рендер избранных билетов
  const renderFavorites = (tickets) => {
    container.innerHTML = '';

    let fragment = '';
    if (!tickets || !tickets.length) return;
    tickets.forEach((ticket) => {
      const elem = ticketTemplate(ticket);
      fragment += elem;
    });
    container.insertAdjacentHTML('afterbegin', fragment);
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
      <button
        class="btn waves-effect waves-light delete-btn"
        data-id="${ticket.id}"
      >
      удалить из избранного
      <i class="material-icons right">delete_forever</i>
    </button>
      </div>
    </div>
  </div>
    `;
  };

  return Object.freeze({ renderFavorites });
};

export default favoriteUI;
