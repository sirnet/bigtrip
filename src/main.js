import { createMenuTemplate } from "./view/menu";
import { createTripInfoTemplate } from "./view/trip-info";
import { createTripCostTemplate } from "./view/trip-cost";
import { createFilterTemplate } from "./view/filters";
import { createTripBoardTemplate } from "./view/trip-board";
import { createNewPointTemplate } from "./view/new-point";
import { createEditPointTemplate } from "./view/edit-point";
import { createWaypointTemplate } from "./view/waypoint";

import { generatePoinData } from "./mock/point-data-generator";
import { getRandomInteger } from "./mock/utils";
import { generateFilterData } from "./mock/filter-data-generator";


const COUNT = 3;
const COUNT_POINT = 5;
const siteBodyElement = document.querySelector('.page-body');

const pointData = new Array(COUNT_POINT).fill(null).map(() => generatePoinData());
const filterData = generateFilterData(pointData);
console.log(pointData);
const render = (container, template, place = 'beforeend') => {
    container.insertAdjacentHTML(place, template);
};

const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render (tripMenuElement, createMenuTemplate(), 'beforeend');

const tripDetalsElement = siteBodyElement.querySelector('.trip-main');
render (tripDetalsElement, createTripInfoTemplate(pointData), 'afterbegin');

const tripCostElement = tripDetalsElement.querySelector('.trip-info');
render (tripCostElement, createTripCostTemplate(pointData));

const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render (tripFilterElement, createFilterTemplate(filterData));

const tripBordElement = siteBodyElement.querySelector('.trip-events');
render (tripBordElement, createTripBoardTemplate());

const tripListElement = tripBordElement.querySelector('.trip-events__list');
render (tripListElement, createNewPointTemplate(pointData[getRandomInteger(0, pointData.length - 1)]));
//render (tripListElement, createEditPointTemplate());

for (let i = 0; i < pointData.length; i++){
    render (tripListElement, createWaypointTemplate(pointData[i]));
};
