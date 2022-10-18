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

    updatePoint(updateType, update) {
        const index = this._points.findIndex((point) => point.id === update.id);
        if (index === -1) {
            return new Error('Can\'t update unexisting point');
        }

        return [
            ...this._points.slice(0, index), 
            update, 
            ...this._points.slice(index + 1),
        ];

        this._notify(updateType, update);
    }

    addPoint(updateType, update) {
        this._points = [
            update,
            ...this._points,
        ];
        this._notify(updateType, update);
    }

    deletePoint(updateType, update) {

    }
}