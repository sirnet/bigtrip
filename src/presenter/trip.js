import { remove, render } from "../utils/render";
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
        this._sortComponent = null;

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
        switch (updateType) {
            case UpdateType.PATCH:
                // - обновляем часть списка
                this._pointPresenter[data.id].init(data);
                break;
            case UpdateType.MINOR:
                //обновить список
                this._clearPointList();
                this._renderBord();
                break;
            case UpdateType.MAJOR:
                //обновить всю доску
                this._clearBord({})
                break;
        }
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
        if(this._sortComponent !== null){
            this._sortComponent = null;
        }

        this._sortComponent = new TripSortTemplate(this._currentSortType);
        this._sortComponent.setSortClickHandler(this._handleSortTypeChange);
        render(this._boardContainer, this._sortComponent);
    }

    _renderPoint(point) {
        const pointPresenter = new Point(this._tripComponent, this._handleViewAction, this._handlePointMode);
        pointPresenter.init(point);
        this._pointPresenter[point.id] = pointPresenter;
    }

    _renderPoints(points) {
        points.forEach((point) => this._renderPoint(point));
    }

    _renderNoPoint() {
        render(this._boardContainer, this._noListEmpty);
    }

    _renderBord() {
        const points = this._getPoints();
        const pointCount =points.length;

        if(pointCount === 0){
            return this._renderNoPoint();
        }
        this._renderSort();
        this._renderTrip();
        //this._renderPointList();

        this._renderPoints(points.slice(0, Math.min(pointCount, this._renderedPointCount)));

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

    _clearBord({resetRernderedPointCount = false, resetSortType = false} = {}){
        const pointCount = this._getPoints().length;

        Object
            .values(this._pointPresenter)
            .forEach((presenter) => presenter.destroy());
        this._pointPresenter = {};

        remove(this._sortComponent);
        remove(this._renderNoPoint);

        if(resetRernderedPointCount){
            this._renderedPointCount = COUNT_POINT;
        } else {
            this._renderedPointCount = Math.min(pointCount, this._renderedPointCount);
        }

        if(resetSortType){
            this._currentSortType = SortType.DAY;
        }
    }
}