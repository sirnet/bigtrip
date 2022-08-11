import { remove, render, RenderPosition, replace } from "../utils/render";
import EditPointTemplate from "../view/edit-point";
import PointOfferTemplate from "../view/waypoint";

const Mode = {
    POINT: 'point',
    EDITOR: 'editor',
}

export default class Point {
    constructor(listPointContainer, changeDate, changeMode) {
        this._listPointContainer = listPointContainer;
        this._changeDate = changeDate;
        this._changeMode = changeMode;

        this._pointComponent = null;
        this._pointEditComponent = null;
        this._pointMode = Mode.POINT;

        this._handleClickPoint = this._handleClickPoint.bind(this);
        this._handleEditPoint = this._handleEditPoint.bind(this);
        this._handleFormSubmint = this._handleFormSubmint.bind(this);   
        this._escKeyDownHandler = this._escKeyDownHandler.bind(this); 
        this._handleFavoritePoint = this._handleFavoritePoint.bind(this);
        
   }

    init(point) {
        this._point = point;

        const prevuousPointComponent = this._pointComponent;
        const previousPointEditorComponent = this._pointEditComponent;

        this._pointComponent = new PointOfferTemplate(this._point);
        this._previousPointEditor = new EditPointTemplate(this._point);

        this._pointComponent.setClickPointHandler(this._handleClickPoint);
        this._pointComponent.setFavoriteClickHandler(this._handleFavoritePoint);
        this._pointEditComponent.setClickEditHandler(this._handleEditPoint);
        this._pointEditComponent.setFormSubmintHandler(this._handleFormSubmint);

        if(prevuousPointComponent === null || previousPointEditorComponent === null){
            render(this._listPointContainer, this._pointComponent, RenderPosition.AFTERBEGIN);
        }

        if(this._pointMode === Mode.POINT){
            replace(this._pointComponent, prevuousPointComponent);
        }

        if(this._pointMode === Mode.EDITOR){
            replace(this._pointComponent, previousPointEditorComponent);
        }

        remove(prevuousPointComponent);
        
    }

    _replaceEditToForm() {
        replace(this._pointEditComponent, this._pointComponent);
        document.addEventListener('keydown', this._escKeyDownHandler);
    }

    _replaceFormToEdit() {
        replace(this._pointComponent, this._pointEditComponent);
        document.addEventListener('keydown', this._escKeyDownHandler);
    }

    _escKeyDownHandler(evt) {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          this.replaceFormToEdit();
        }
    }

    _handleClickPoint() {
        this._replaceEditToForm();
       
    }

    _handleEditPoint() {
        this._replaceFormToEdit();
    }

    _handleFormSubmint() {
        this._replaceFormToEdit();
    }

    _handleFavoritePoint() {
        this._changeDate(
            Object.assign(
                {},
                this._point,
                {
                    isFavorite: !this._point.isFavorite,
                }
            )
        );
    }
}