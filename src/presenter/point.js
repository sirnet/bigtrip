import { remove, render, RenderPosition, replace } from "../utils/render";
import EditPointTemplate from "../view/edit-point";
import PointOfferTemplate from "../view/waypoint";
import { UserAction, UpdateType } from "../const";

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
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        
   }

    init(point) {
        this._point = point;

        const previousPointComponent = this._pointComponent;
        const previousPointEditorComponent = this._pointEditComponent;

        this._pointComponent = new PointOfferTemplate(this._point);
        this._pointEditComponent = new EditPointTemplate(this._point);

        this._pointComponent.setClickPointHandler(this._handleClickPoint);
        this._pointComponent.setFavoriteClickHandler(this._handleFavoritePoint);
        this._pointEditComponent.setClickEditHandler(this._handleFormSubmint);
        this._pointEditComponent.setFormSubmintHandler(this._handleEditPoint);
        this._pointEditComponent.setDeleteClickHandle(this._handleDeleteClick);
        

        if(previousPointComponent === null || previousPointEditorComponent === null){
            render(this._listPointContainer, this._pointComponent, RenderPosition.AFTERBEGIN);
            return;
        }

        if(this._pointMode === Mode.POINT){
            replace(this._pointComponent, previousPointComponent);
        }

        if(this._pointMode === Mode.EDITOR){
            replace(this._pointEditComponent, previousPointEditorComponent);
        }

        remove(previousPointComponent);
        remove(previousPointEditorComponent);
        
    }

    destroy(){
        remove(this._pointComponent);
        remove(this._pointEditComponent);
    }

    resetView() {
        if(this._pointMode !== Mode.POINT){
            this._replaceFormToEdit();
        }
    }

    _replaceEditToForm() {
        replace(this._pointEditComponent, this._pointComponent);
        document.addEventListener('keydown', this._escKeyDownHandler);
        this._changeMode();
        this._pointMode = Mode.EDITOR;
        
               
    }

    _replaceFormToEdit() {
        this._pointEditComponent.resetInput(this._point);
        replace(this._pointComponent, this._pointEditComponent);
        document.removeEventListener('keydown', this._escKeyDownHandler);
        this._pointMode = Mode.POINT;
    }

    _escKeyDownHandler(evt) {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          this._replaceFormToEdit();
        }
    }

    _handleClickPoint() {
        this._replaceEditToForm();
    }

    _handleEditPoint() {
        this._replaceFormToEdit();
    }

    _handleFormSubmint(point) {
        this._changeDate(
            UserAction.UPDATE_POINT,
            UpdateType.MINOR,
            point,
        );
        this._replaceFormToEdit();
    }

    _handleDeleteClick(point) {
        this._changeDate(
            UserAction.DELETE_POINT,
            UpdateType.MINOR,
            point,
        );
    }

    _handleFavoritePoint() {
        this._changeDate(
            UserAction.UPDATE_POINT,
            UpdateType.MINOR,
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