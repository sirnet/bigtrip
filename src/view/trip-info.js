//Информация о маршруте
import {createElement, humanizeDate} from '../mock/utils';


const createTripCityItemTemplate = (array) => {
  return array.map(({description}) => {
    return description.name;
  }).join('&nbsp;&mdash;&nbsp');
};

const createTripTimeItemTemplate = (array) => {
  return `${humanizeDate(array[0].dateFrom, 'MMM D')} &nbsp;&mdash;&nbsp; ${humanizeDate(array[array.length-1].dateTo, 'MMM D')}`;
};

const createTripInfoTemplate = (array) => {
return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${createTripCityItemTemplate(array)}</h1>
    <p class="trip-info__dates">${createTripTimeItemTemplate(array)}</p>
    </div>
    </section>`;
};

export default class TripInfoTemplate  {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._date);
  }

  getElement() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}