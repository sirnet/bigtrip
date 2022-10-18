import { render } from "../utils/render";
import ListEmpty from "../view/list-empty";
import PointList from "../view/point-list";
import TripInfoTemplate from "../view/trip-info";
import TripSortTemplate from "../view/trip-sort";
import { updateItem } from "../utils/common";
import { sortPointPrice, sortPointTime } from "../utils/point";
import Point from "./point";
import { SortType, UpdateType, UserAction } from "../const";

const COUNT_POINT = 5;

export default class Trip {
    constructor(boardContainer, pointsModel) {
        this._pointsModel = pointsModel;
        this._boardContainer = boardContainer;
        this._renderedPointCount = COUNT_POINT;
        this._pointPresenter = {};
        this._currentSortType = SortType.DEFAULT;

        this._sortComponent = new TripSortTemplate();
        this._noListEmpty = new ListEmpty();
        this._infoComponent = new TripInfoTemplate();
        this._tripComponent = new PointList();

        this._handleModelEvent = this._handleModelEvent.bind(this);
        this._handleViewAction = this._handleViewAction.bind(this);
        this._handlePointMode = this._handlePointMode.bind(this);

        this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
        this._pointsModel.addObserver(this._handleModelEvent);
    }

    init() {
        this._renderBord();
    }

    _getPoints() {
        return this._pointsModel.getPoints();
    }

    _handleViewAction(actionType, updateType, update){
        switch (actionType) {
            case UserAction.UPDATE_POINT:
                this._pointsModel.updatePoint(updateType, update);
                break;
            case UserAction.ADD_POINT:
                this._pointsModel.addPoin(updateType, update);
                break;
            case UserAction.DELETE_POINT:
                this._pointsModel.deletePoint(updateType, update);
                break;
        }
    }

    _handleModelEvent(updateType, data) {
        console.log(updateType, data);
    }

    _handlePointMode(){
        Object
        .values(this._pointPresenter)
        .forEach((presenter) => presenter.resetView());
    }

    _renderTrip() {
        render(this._boardContainer, this._tripComponent);
    }

    _renderSort() {
        render(this._boardContainer, this._sortComponent);
        this._sortComponent.setSortClickHandler(this._handleSortTypeChange);
    }

    _renderPoint(point) {
        const pointPresenter = new Point(this._tripComponent, this._handleViewAction, this._handlePointMode);
        pointPresenter.init(point);
        this._pointPresenter[point.id] = pointPresenter;
    }

    _clearPointList() {
        Object
        .values(this._pointPresenter)
        .forEach((presenter) => presenter.destroy());
        this.pointPresenter = {};
        this._renderedPointCount = COUNT_POINT;
    }

    _renderPointList() {
        const pointCount = this._getPoints().length;
        const points = this._getPoints().slice(0, Math.min(pointCount, COUNT_POINT)) 
        this._renderPoints(points);
    }

    _renderPoints(points) {
        points.forEach((point) => this._renderPoint(point));
    }

    _renderNoPoint() {
        render(this._boardContainer, this._noListEmpty);
    }

    _renderBord() {
        if(this._getPoints().every((point) => point.length === 0)){
            return this._renderNoPoint();
        }
        this._renderSort();
        this._renderTrip();
        this._renderPointList();
    }

    _sortPoints(sortType) {
        switch (sortType) {
            case SortType.DAY:
                this._getPoints().sort(sortPointTime);
                break;
            case SortType.PRICE:
                this._getPoints().sort(sortPointPrice);
                break;
            case SortType.TIME:
                this._getPoints().sort(sortPointTime);
                break;
            default:
                throw new Error('Error by sort');
        }

        this._currentSortType = sortType;
    }

    _handleSortTypeChange(sortType) {
        if(this._currentSortType === sortType) {
            return;
        }

        this._sortPoints(sortType);
        this._clearPointList();
        this._renderPointList();
    }
}