import Observer from "../utils/observer";

export default class Points extends Observer{
    constructor() {
        super();
        this._points = [];
    }

    setPoints(point) {
        this._points = point.slice();
    }

    getPoints() {
        return this._points;
    }
}