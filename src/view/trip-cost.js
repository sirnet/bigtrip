import { createElement } from "../mock/utils";

//Стоимость
let summ = 0;

const createTripCostSumm = (array) => {
  array.forEach(element => {
    summ += element.basePrice;
  });
  return summ;
};

const createTripCostTemplate = (array) => {
    return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${createTripCostSumm(array)}</span>
  </p>`;
};

export default class TripCostTemplate {
  constructor(date){
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._date);
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