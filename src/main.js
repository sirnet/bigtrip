import { createMenuTemplate } from "./view/menu";
import { createTripInfoTemplate } from "./view/trip-info";
import { createTripCostTemplate } from "./view/trip-cost";
import { createFilterTemplate } from "./view/filters";
import { createTripBoardTemplate } from "./view/trip-board";
import { createNewPointTemplate } from "./view/new-point";
import { createEditPointTemplate } from "./view/edit-point";
import { createWaypointTemplate } from "./view/waypoint";

import { generatePoinData } from "./mock/point-data-generator";


const COUNT_POINT = 3;
const siteBodyElement = document.querySelector('.page-body');

const point = new Array(20).fill().map(() => generatePoinData());
console.log(point);

const render = (container, template, place = 'beforeend') => {
    container.insertAdjacentHTML(place, template);
};

const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render (tripMenuElement, createMenuTemplate(), 'beforeend');

const tripDetalsElement = siteBodyElement.querySelector('.trip-main');
render (tripDetalsElement, createTripInfoTemplate(), 'afterbegin');

const tripCostElement = tripDetalsElement.querySelector('.trip-info');
render (tripCostElement, createTripCostTemplate());

const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render (tripFilterElement, createFilterTemplate());

const tripBordElement = siteBodyElement.querySelector('.trip-events');
render (tripBordElement, createTripBoardTemplate());

const tripListElement = tripBordElement.querySelector('.trip-events__list');
render (tripListElement, createNewPointTemplate());
render (tripListElement, createEditPointTemplate());

for (let i=0; i < COUNT_POINT; i++){
    render (tripListElement, createWaypointTemplate());
};
