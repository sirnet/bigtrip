
import Abstract from "./abstract";

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

export default class TripCostTemplate extends Abstract{
  constructor(date){
    super()
    this._date = date;
  }

  getTemplate() {
    return createTripCostTemplate(this._date);
  }
}