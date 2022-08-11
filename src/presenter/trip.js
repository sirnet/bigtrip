import { render } from "../utils/render";
import ListEmpty from "../view/list-empty";
import PointList from "../view/point-list";
import TripInfoTemplate from "../view/trip-info";
import TripSortTemplate from "../view/trip-sort";
import { updateItem } from "../utils/common";
import Point from "./point";

const COUNT_POINT = 5;

export default class Trip {
    constructor(boardContainer) {
        this._boardContainer = boardContainer;
        this._pointPresenter = {};

        this._sortComponent = new TripSortTemplate();
        this._noListEmpty = new ListEmpty();
        this._infoComponent = new TripInfoTemplate();
        this._tripComponent = new PointList();

        this._handlePointChange = this._handlePointChange.bind(this);
    }
    init(pointData) {
        this._pointData = pointData.slice();
        this._renderBord();
    }

    _handlePointChange(updatePoint) {
        this._point = updateItem(this._pointData, updatePoint);
        this._pointPresenter[updatePoint.isFavorite].init(updatePoint);
    }

    _renderTrip() {
        render(this._boardContainer, this._tripComponent);
    }

    _renderSort() {
        render(this._boardContainer, this._sortComponent);
    }

    _renderPoint(point) {
        const pointPresenter = new Point(this._tripComponent, this._handlePointChange);
        pointPresenter.init(point);
    }

    _renderPointList() {
        this._renderPoints(0, Math.min(this._pointData.length, COUNT_POINT))
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
}