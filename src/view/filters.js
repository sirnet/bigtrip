//Фильтр

const createFilterItemTemplate = (array) => {
  return array.map(({name, amount}) => {
    return `<div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
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