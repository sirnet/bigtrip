import { render } from "../utils/render";
import ListEmpty from "../view/list-empty";
import PointList from "../view/point-list";
import TripInfoTemplate from "../view/trip-info";
import TripSortTemplate from "../view/trip-sort";
import { updateItem } from "../utils/common";
import { sortPointPrice, sortPointTime } from "../utils/point";
import Point from "./point";
import { SortType } from "../const";

const COUNT_POINT = 5;

export default class Trip {
    constructor(boardContainer) {
        this._boardContainer = boardContainer;
        this._renderedPointCount = COUNT_POINT;
        this._pointPresenter = {};
        this._currentSortType = SortType.DEFAULT;

        this._sortComponent = new TripSortTemplate();
        this._noListEmpty = new ListEmpty();
        this._infoComponent = new TripInfoTemplate();
        this._tripComponent = new PointList();

        this._handlePointChange = this._handlePointChange.bind(this);
        this._handlePointMode = this._handlePointMode.bind(this);

        this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    }

    init(pointData) {
        this._pointData = pointData.slice();
        this._sourcedBordPoint = pointData.slice();
        this._renderBord();
    }

    _handlePointChange(updatePoint) {
        this._point = updateItem(this._pointData, updatePoint);
        this._sourcedBordPoint = updateItem(this._sourcedBordPoint, updatePoint);
        this._pointPresenter[updatePoint.id].init(updatePoint);
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
        const pointPresenter = new Point(this._tripComponent, this._handlePointChange, this._handlePointMode);
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
        this._renderPoints(0, Math.min(this._pointData.length, COUNT_POINT));
    }

    _renderPoints(from, to) {
        this._pointData
        .slice(from, to)
        .forEach((pointData) => this._renderPoint(pointData));
    }

    _renderNoPoint() {
        render(this._boardContainer, this._noListEmpty);
    }

    _renderBord() {
        if(this._pointData.length === 0){
            return _renderNoPoint();
        }
        this._renderSort();
        this._renderTrip();
        this._renderPointList();
    }

    _sortPoints(sortType) {
        switch (sortType) {
            case SortType.DAY:
                this._pointData = this._sourcedBordPoint.slice();
                break;
            case SortType.PRICE:
                this._pointData.sort(sortPointPrice);
                break;
            case SortType.TIME:
                this._pointData.sort(sortPointTime);
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