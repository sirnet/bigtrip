import { createMenuTemplate } from "./view/menu";
import { createTripInfoTemplate } from "./view/trip-info";
import { createTripCostTemplate } from "./view/trip-cost";
import { createFilterTemplate } from "./view/filters";
import { createTripBoardTemplate } from "./view/trip-board";
import { createNewPointTemplate } from "./view/new-point";
import { createEditPointTemplate } from "./view/edit-point";
import PointOfferTemplate from "./view/waypoint";

import { generatePoinData } from "./mock/point-data-generator";
import { getRandomInteger, renderElement, renderTemplate } from "./mock/utils";
import { generateFilterData } from "./mock/filter-data-generator";


const COUNT = 3;
const COUNT_POINT = 5;
const siteBodyElement = document.querySelector('.page-body');

const pointData = new Array(COUNT_POINT).fill(null).map(() => generatePoinData());
const filterData = generateFilterData(pointData);
console.log(pointData);

const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
renderTemplate (tripMenuElement, createMenuTemplate(), 'beforeend');

const tripDetalsElement = siteBodyElement.querySelector('.trip-main');
renderTemplate (tripDetalsElement, createTripInfoTemplate(pointData), 'afterbegin');

const tripCostElement = tripDetalsElement.querySelector('.trip-info');
renderTemplate (tripCostElement, createTripCostTemplate(pointData));

const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
renderTemplate (tripFilterElement, createFilterTemplate(filterData));

const tripBordElement = siteBodyElement.querySelector('.trip-events');
renderTemplate (tripBordElement, createTripBoardTemplate());

const tripListElement = tripBordElement.querySelector('.trip-events__list');
//render (tripListElement, createNewPointTemplate(pointData[getRandomInteger(0, pointData.length - 1)]));
renderTemplate (tripListElement, createEditPointTemplate(pointData[0]));

for (let i = 1; i < pointData.length; i++){
    renderElement (tripListElement, new PointOfferTemplate(pointData[i]).getElement());
};
