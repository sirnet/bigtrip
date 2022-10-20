//Редактирование формы
import dayjs from "dayjs";
import { CITES, TYPES } from "../const";
import { getRandomArrayElement } from '../utils/common'
import { humanizeDate, pickOffersDependOnType } from '../utils/point'
import { generatedDescription, generateOffers } from '../mock/point-data-generator';
import SmartView from "./smart";
import flatpickr from "flatpickr";

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

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
        <button class="event__reset-btn" type="button">Delete</button>
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


export default class EditPointTemplate extends SmartView {
  constructor(date = EMPTY_POINT) {
    super();
    this._date = EditPointTemplate.parseDataToState(date);
    this._dateStartpicker = null;
    this._dateEndpicker = null;

    this._clickEditHandler = this._clickEditHandler.bind(this);
    this._formSubmintHandler = this._formSubmintHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._onPointTypeChange = this._onPointTypeChange.bind(this);
    this._onPointInput = this._onPointInput.bind(this);
    this._dueDateStartChangeHandler = this._dueDateStartChangeHandler.bind(this);
    this._dueDateEndChangeHandler = this._dueDateEndChangeHandler.bind(this);
    this._setInnerLesteners();
    this._setDataStartpicker();
    this._setDataEndpicker();
  }

  static parseDataToState(date) {
    return Object.assign(
      {},
      date,
    );
  }

  static parseStateToDate(state) {
    return Object.assign(
      {},
      state,
    );
  }

  getTemplate() {
    return createEditPointTemplate(this._date);
  }

  _clickEditHandler(evt) {
    evt.preventDefault();
    this._callback.click(EditPointTemplate.parseStateToDate(this._date));
  }

  _formSubmintHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setClickEditHandler(callback){
    this._callback.click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickEditHandler);
  }

  setFormSubmintHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit',this._clickEditHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditPointTemplate.parseDataToState(this._date));
  }

  setDeleteClickHandle(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  resetInput(date) {
    this.updateData(EditPointTemplate.parseDataToState(date));
  }

  restoreListeners() {
    this._setInnerLesteners();
    this._setDataStartpicker();
    this._setDataEndpicker();
    this.setClickEditHandler(this._callback.click);
    this.setFormSubmintHandler(this._callback.formSubmit);
    this.setDeleteClickHandle(this._callback.deleteClick);
  }

  _setInnerLesteners() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._onPointTypeChange);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._onPointInput);
  }

  _onRollUpClick() {
    this._callback.rollUpClick();
  }

  _onPointTypeChange(evt){
    evt.preventDefault();
    if(evt.target.tagName !== 'INPUT'){
      return;
    }
    this.updateData({
      type: evt.target.value,
      offers:  pickOffersDependOnType(evt.target.value, generateOffers) 
    });
  }

  _onPointInput(evt) {
    if(!CITES.includes(evt.target.value)){
      return;
    }

    evt.preventDefault();
    this.updateData({
      description: pickOffersDependOnType(evt.target.value, generatedDescription, true)
    });
  }

  _setDataStartpicker(){
    if(this._dateStartpicker){
      this._dateStartpicker.destroy();
      this._dateStartpicker = null;
    }

    
      this._dateStartpicker = flatpickr(
        this.getElement().querySelector('#event-start-time-1'),
        {
          enableTime: true,
          time_24hr: true,
          dateFormat: 'd/m/Y H:i',
          defaultDate: this._date.dateFrom,
          onChange: this._dueDateStartChangeHandler,
        },
      );
    
  }

  _setDataEndpicker(){
    if(this._dateEndpicker){
      this._dateEndpicker.destroy();
      this._dateEndpicker = null;
    }

    
      this._dateEndpicker = flatpickr(
        this.getElement().querySelector('#event-end-time-1'),
        {
          enableTime: true,
          time_24hr: true,
          dateFormat: 'd/m/Y H:i',
          defaultDate: this._date.dateTo,
          onChange: this._dueDateEndChangeHandler,
        },
      );
    
  }

  _dueDateStartChangeHandler([userDate]) {
    this.updateData({
      dateFrom : userDate,
    });
  }

  _dueDateEndChangeHandler([userDate]) {
    this.updateData({
      dateTo : userDate,
    });
  }

}