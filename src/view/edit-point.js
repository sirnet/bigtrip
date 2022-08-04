//Редактирование формы
import dayjs from "dayjs";
import { CITES, TYPES } from "../const";
import { createElement, getRandomArrayElement, humanizeDate } from "../utils";

const EMPTY_POINT = {
  type: getRandomArrayElement(TYPES),
  offers: [],
  description: {
    name: getRandomArrayElement(CITES),
    description: '',
    pictures: '',
  },
  dateFrom: dayjs(),
  dateTo: dayjs(),
  basePrice: '',
};

const eventType = (date, type) => {

  return `${date.map((val) => {
      return `<div class="event__type-item">
      <input id="event-type-${val}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${val}" ${val === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${val}" for="event-type-${val}-1">${val}</label>
    </div>`;
  }).join('')}`;
};

const optionDestination = (city, name) => {
  return city.map((val) => {
    return val != name ? `<option value="${val}"></option>` : '';
  }).join('');
  
};

export const createEditPointTemplate = (array) => {
  const {dateFrom, dateTo, description, offers, type, basePrice} = array;
    return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventType(TYPES, type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${description.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${optionDestination(CITES, description.name)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, 'DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, 'DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          
          <div class="event__available-offers">
          ${offers.map(({title, price}) => `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${title}" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-${title}">
              <span class="event__offer-title">${title}</span>
               &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
              </label>
            </div>`
            ).join('')}
            </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description.description}</p>
          <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${description.pictures.map((val) => `
                      <img class="event__photo" src="${val}" alt="Event photo">`
                      ).join('')} 
                      </div>
        </section>
    </form>
  </li>`;
};


export default class EditPointTemplate {
  constructor(date = EMPTY_POINT) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createEditPointTemplate(this._date);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}