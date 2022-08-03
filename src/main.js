import MainMenu from "./view/menu";
import TripInfoTemplate from "./view/trip-info";
import TripCostTemplate from "./view/trip-cost";
import Filter from "./view/filters";
import TripBoardTemplate from "./view/trip-sort";
import NewPointTemplate from "./view/new-point";
import EditPointTemplate from "./view/edit-point";
import PointOfferTemplate from "./view/waypoint";
import PointList from "./view/point-list";

import { generatePoinData } from "./mock/point-data-generator";
import { renderElement, RenderPosition } from "./mock/utils";
import { generateFilterData } from "./mock/filter-data-generator";

const COUNT_POINT = 5;
const siteBodyElement = document.querySelector('.page-body');

const pointData = new Array(COUNT_POINT).fill(null).map(() => generatePoinData());
const filterData = generateFilterData(pointData);
console.log(pointData);

const MainMenuComponent = new MainMenu()
const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
renderElement (tripMenuElement, MainMenuComponent.getElement());

const TripInfoComponent = new TripInfoTemplate(pointData)
const tripDetalsElement = siteBodyElement.querySelector('.trip-main');
renderElement (tripDetalsElement, TripInfoComponent.getElement(), 'afterbegin');

const TripCostComponent = new TripCostTemplate(pointData);
const tripCostElement = tripDetalsElement.querySelector('.trip-info');
renderElement (tripCostElement, TripCostComponent.getElement());

const FilterComponent = new Filter(filterData) 
const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
renderElement (tripFilterElement, FilterComponent.getElement());

const tripBordComponent = new TripBoardTemplate();
const tripBordElement = siteBodyElement.querySelector('.trip-events');
renderElement(tripBordElement, tripBordComponent.getElement());

const tripListComponent = new PointList();
renderElement (tripBordElement, tripListComponent.getElement(), RenderPosition.BEFOREEND);

//renderElement (tripListElement, new NewPointTemplate(pointData[getRandomInteger(0, pointData.length - 1)]).getElement());
//const EditPointComponent = new EditPointTemplate(pointData[0])
//renderElement (tripListComponent.getElement(), EditPointComponent.getElement());
 
for (let i = 1; i < pointData.length; i++){
    renderElement (tripListComponent.getElement(), new PointOfferTemplate(pointData[i]).getElement());
};
