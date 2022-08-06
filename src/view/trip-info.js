//Информация о маршруте
import { humanizeDate} from '../utils/point';
import Abstract from './abstract';


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

export default class TripInfoTemplate  extends Abstract{
  constructor(date) {
    super();
    this._date = date;

  }

  getTemplate() {
    return createTripInfoTemplate(this._date);
  }
}