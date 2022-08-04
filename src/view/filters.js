//Фильтр

import { createElement } from "../utils";

const createFilterItemTemplate = (array) => {
  return array.map(({name, amount}) => {
    return `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${amount}" checked>
    <label class="trip-filters__filter-label" for="filter-everything">${name} ${amount}</label>
  </div>`;
  }).join('');
};

export const createFilterTemplate = (array) => {
    return `<form class="trip-filters" action="#" method="get">
    ${createFilterItemTemplate(array)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._date);
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