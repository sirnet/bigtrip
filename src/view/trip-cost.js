//Стоимость
let summ = 0;

const createTripCostSumm = (array) => {
  array.forEach(element => {
    summ += element.basePrice;
  });
  return summ;
};

export const createTripCostTemplate = (array) => {
    return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${createTripCostSumm(array)}</span>
  </p>`;
};