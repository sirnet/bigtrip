import { createMenuTemplate } from "./view/menu";
import { createRouteInfoTemplate } from "./view/route-info";
import { createFilterTemplate } from "./view/filters";
import { createSortTemplate } from "./view/sort";
import { createAddNewPoint } from "./view/add-new-point";
import { createEditPointTemplate } from "./view/edit-point";
import { createWaypointTemplate } from "./view/waypoint";

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector('.page-body');
render (siteBodyElement, createRouteInfoTemplate(), 'afterbegin');

const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render (tripMenuElement, createMenuTemplate(), 'beforeend');

const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render (tripFilterElement, createFilterTemplate(), 'beforeend');

const tripBordElement = siteBodyElement.querySelector('.trip-events');






render (tripEventsElement, createSortTemplate(), 'beforeend');
render (tripEventsElement, createAddNewPoint(), 'beforeend');
render (tripEventsElement, createEditPointTemplate(), 'beforeend');
render (tripEventsElement, createWaypointTemplate(), 'beforeend');