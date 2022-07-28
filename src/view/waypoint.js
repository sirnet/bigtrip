//Точка маршрута
import { humanizeDate, getTimeDuration} from "../mock/utils";


const createPointOfferTemplate = (offers) => {
  return offers.length > 0 ? `${offers.map(({title, price}) => `
    <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`).join('')}`
: '';
  };

const createFavoritPointTemplate = (favorite) => {
  return favorite == true ? `event__favorite-btn--active` : ""; 
}

export const createWaypointTemplate = (array) => {
  const {basePrice, dateFrom, dateTo, description, offers, type, isFavorite} = array;
    return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizeDate(dateFrom, 'YYYY-MM-DD')}">${humanizeDate(dateFrom, 'MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${description.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${humanizeDate(dateFrom, 'YYYY-MM-DDTHH:mm')}">${humanizeDate(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${humanizeDate(dateFrom, 'YYYY-MM-DDTHH:mm')}">${humanizeDate(dateTo)}</time>
          </p>
          <p class="event__duration">${getTimeDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createPointOfferTemplate(offers)}  
        </ul>
        <button class="event__favorite-btn ${createFavoritPointTemplate(isFavorite)}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};