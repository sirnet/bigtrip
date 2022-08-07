import { render } from "../utils/render";
import ListEmpty from "../view/list-empty";
import TripCostTemplate from "../view/trip-cost";
import TripInfoTemplate from "../view/trip-info";
import TripSortTemplate from "../view/trip-sort";


export default class Point {
    constructor(boardContainer) {
        this._boardContainer = boardContainer;

        this._costComponent = new TripCostTemplate();
        this._sortComponent = new TripSortTemplate();
        this._noListEmpty = new ListEmpty();
        this._infoComponent = new TripInfoTemplate();
    }
    init(pointData) {
        this._pontData = pointData.slice();
    }

    _renderCost() {

    }

    _renderSort() {

    }

    _renderPoint(from, to) {

    }

    _renderNoPoint() {
        render()
    }

    _renderBord() {
        if(this._pontData.length === 0){

        }
    }

}