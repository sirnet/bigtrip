//Фильтр

import Abstract from "./abstract";

const createFilterItemTemplate = (array) => {
  return array.map(({name, amount}) => {
    return `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${amount}" checked>
    <label class="trip-filters__filter-label" for="filter-everything">${name} ${amount === 0 ? '' : amount}</label>
  </div>`;
  }).join('');
};

export const createFilterTemplate = (array) => {
    return `<form class="trip-filters" action="#" method="get">
    ${createFilterItemTemplate(array)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter extends Abstract{
  constructor(date) {
    super();
    this._date = date;
  }

  getTemplate() {
    return createFilterTemplate(this._date);
  }
}