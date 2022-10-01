import MainMenu from "./view/menu";
import TripInfoTemplate from "./view/trip-info";
import TripCostTemplate from "./view/trip-cost";
import Filter from "./view/filters";
import { generatePoinData } from "./mock/point-data-generator";
import { RenderPosition } from "./utils/render";
import { render } from "./utils/render";
import { generateFilterData } from "./mock/filter-data-generator";
import TripPresenter from "./presenter/trip";
import PointsModel from './model/points';

const COUNT_POINT = 5;
const pointData = new Array(COUNT_POINT).fill(null).map(() => generatePoinData());
const filterData = generateFilterData(pointData);

const siteBodyElement = document.querySelector('.page-body');
const tripMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const tripFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const tripDetalsElement = siteBodyElement.querySelector('.trip-main');
const tripBordElement = siteBodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.setPoints(pointData);

const MainMenuComponent = new MainMenu();
render (tripMenuElement, MainMenuComponent);

const FilterComponent = new Filter(filterData); 
render (tripFilterElement, FilterComponent);

const tripInfoComponent = new TripInfoTemplate(pointData);
render (tripDetalsElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

const TripCostComponent = new TripCostTemplate(pointData);
render (tripInfoComponent.getElement(), TripCostComponent.getElement());

const tripPresenter = new TripPresenter(tripBordElement, pointsModel);

tripPresenter.init();
