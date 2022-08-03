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
import { render, RenderPosition } from "./mock/utils";
import { generateFilterData } from "./mock/filter-data-generator";

const COUNT_POINT = 5;

const renderPoint = (tripListComponent, date) => {
    const pointComponent = new PointOfferTemplate(date);
    const pointEditComponent = new EditPointTemplate(date);

    render(tripListComponent, pointComponent.getElement());

    const replaceEditToForm = () => {
        tripListComponent.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    }

    const replaceFormToEdit = () => {
        tripListComponent.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
    }

    pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
        replaceEditToForm();
    });

    pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
        replaceFormToEdit();
    });

    pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
        evt.preventDefault();
        replaceFormToEdit();
    });

}

const siteBodyElement = document.querySelector('.page-body');

const pointData = new Array(COUNT_POINT).fill(null).map(() => generatePoinData());
const filterData = generateFilterData(pointData);
console.log(pointData);

const MainMenuComponent = new MainMenu()
const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render (tripMenuElement, MainMenuComponent.getElement());

const TripInfoComponent = new TripInfoTemplate(pointData)
const tripDetalsElement = siteBodyElement.querySelector('.trip-main');
render (tripDetalsElement, TripInfoComponent.getElement(), 'afterbegin');

const TripCostComponent = new TripCostTemplate(pointData);
const tripCostElement = tripDetalsElement.querySelector('.trip-info');
render (tripCostElement, TripCostComponent.getElement());

const FilterComponent = new Filter(filterData) 
const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
render (tripFilterElement, FilterComponent.getElement());

const tripBordComponent = new TripBoardTemplate();
const tripBordElement = siteBodyElement.querySelector('.trip-events');
render(tripBordElement, tripBordComponent.getElement());

const tripListComponent = new PointList();
render(tripBordElement, tripListComponent.getElement(), RenderPosition.BEFOREEND);

//renderElement (tripListElement, new NewPointTemplate(pointData[getRandomInteger(0, pointData.length - 1)]).getElement());
//const EditPointComponent = new EditPointTemplate(pointData[0])
//renderElement (tripListComponent.getElement(), EditPointComponent.getElement());

for (let i = 1; i < pointData.length; i++){
    renderPoint (tripListComponent.getElement(), pointData[i]);
};
