import { createMenuTemplate } from "./view/menu";
import { createRouteInfoTemplate } from "./view/route-info";
import { createFilterTemplate } from "./view/filters";
import { createTripBoardTemplate } from "./view/trip-board";
import { createAddNewPoint } from "./view/add-new-point";
import { createEditPointTemplate } from "./view/edit-point";
import { createWaypointTemplate } from "./view/waypoint";

const COUNT_POINT = 3;
const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector('.page-body');
const tripRouteInfo = siteBodyElement.querySelector('.trip-main');

render (tripRouteInfo, createRouteInfoTemplate(), 'afterbegin');

const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render (tripMenuElement, createMenuTemplate(), 'beforeend');

const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render (tripFilterElement, createFilterTemplate(), 'beforeend');

const tripBordElement = siteBodyElement.querySelector('.trip-events');
render (tripBordElement, createTripBoardTemplate(), 'beforeend');

const tripListElement = tripBordElement.querySelector('.trip-events__list');
render (tripListElement, createAddNewPoint(), 'beforeend');
render (tripListElement, createEditPointTemplate(), 'beforeend');

for (let i=0; i < COUNT_POINT; i++){
    render (tripListElement, createWaypointTemplate(), 'beforeend');
};
