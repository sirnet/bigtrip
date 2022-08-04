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
import { render, RenderPosition } from "./utils";
import { generateFilterData } from "./mock/filter-data-generator";

const COUNT_POINT = 5;
const pointData = new Array(COUNT_POINT).fill(null).map(() => generatePoinData());
const filterData = generateFilterData(pointData);
console.log(pointData);

const siteBodyElement = document.querySelector('.page-body');
const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const tripDetalsElement = siteBodyElement.querySelector('.trip-main');
const tripBordElement = siteBodyElement.querySelector('.trip-events');

const tripCostElement = tripDetalsElement.querySelector('.trip-info');

const MainMenuComponent = new MainMenu()
render (tripMenuElement, MainMenuComponent.getElement());

const FilterComponent = new Filter(filterData) 
render (tripFilterElement, FilterComponent.getElement());

const renderPoint = (tripListComponent, date) => {
    const pointComponent = new PointOfferTemplate(date);
    const pointEditComponent = new EditPointTemplate(date);

    const replaceEditToForm = () => {
        tripListComponent.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    };

    const replaceFormToEdit = () => {
        tripListComponent.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          replaceFormToEdit();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

    pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
        replaceEditToForm();
        document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
        replaceFormToEdit();
        document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
        evt.preventDefault();
        replaceFormToEdit();
        document.addEventListener('keydown', onEscKeyDown);
    });

    render(tripListComponent, pointComponent.getElement());

};

// const TripInfoComponent = new TripInfoTemplate(pointData)
// render (tripDetalsElement, TripInfoComponent.getElement(), 'afterbegin');

const TripCostComponent = new TripCostTemplate(pointData);
render (tripCostElement, TripCostComponent.getElement());

const tripBordComponent = new TripBoardTemplate();
render(tripBordElement, tripBordComponent.getElement());

const tripListComponent = new PointList();
render (tripBordElement, tripListComponent.getElement(), RenderPosition.BEFOREEND);


for (let i = 1; i < pointData.length; i++){
    renderPoint (tripListComponent.getElement(), pointData[i]);
};
