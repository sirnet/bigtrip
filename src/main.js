import MainMenu from "./view/menu";
import TripInfoTemplate from "./view/trip-info";
import TripCostTemplate from "./view/trip-cost";
import Filter from "./view/filters";
import TripSortTemplate from "./view/trip-sort";
import NewPointTemplate from "./view/new-point";
import EditPointTemplate from "./view/edit-point";
import PointOfferTemplate from "./view/waypoint";
import PointList from "./view/point-list";
import Point from "./presenter/point";
import { generatePoinData } from "./mock/point-data-generator";
import { RenderPosition } from "./utils/render";
import { render } from "./utils/render";
import { generateFilterData } from "./mock/filter-data-generator";
import ListEmpty from "./view/list-empty";

const COUNT_POINT = 5;
const pointData = new Array(COUNT_POINT).fill(null).map(() => generatePoinData());
const filterData = generateFilterData(pointData);
console.log(pointData);

const siteBodyElement = document.querySelector('.page-body');
const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
//const tripDetalsElement = siteBodyElement.querySelector('.trip-main');
const tripBordElement = siteBodyElement.querySelector('.trip-events');

const MainMenuComponent = new MainMenu();
render (tripMenuElement, MainMenuComponent);

const FilterComponent = new Filter(filterData); 
render (tripFilterElement, FilterComponent);

const tripInfoComponent = new TripInfoTemplate(pointData);

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

    pointComponent.setClickPointHandler(() => {
        replaceEditToForm();
        document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setClickEditHandler(() => {
        replaceFormToEdit();
        document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmintHandler(() => {
        replaceFormToEdit();
        document.addEventListener('keydown', onEscKeyDown);
    });

    render(tripListComponent, pointComponent.getElement());

};

const renderBord = (pointData) => {
    if(pointData.length === 0){
        render(tripBordElement, new ListEmpty().getElement());
        return;
    }

    const TripCostComponent = new TripCostTemplate(pointData);
    render (tripInfoComponent.getElement(), TripCostComponent.getElement());
    
    const tripSortComponent = new TripSortTemplate();
    render(tripBordElement, tripSortComponent.getElement());
    
    const tripListComponent = new PointList();
    render (tripBordElement, tripListComponent.getElement(), RenderPosition.BEFOREEND);
    
    for (let i = 1; i < pointData.length; i++){
        renderPoint (tripListComponent.getElement(), pointData[i]);
    }
};

renderBord(pointData);
