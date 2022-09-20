import Abstract from "./abstract";

export default class Smart extends Abstract {
    constructor(){
        super();
        this._date = {};
    }

    updateElement() {
        const prevElement = this.getElement();
        const parent = prevElement.parentElement;
        this.removeElement();

        const newElement = this.getElement();
        parent.replaceChild(newElement, prevElement);
    }

    updateData(update) {
        if(!update){
            return;
        }

        this._date = Object.assign(
            {},
            this._date,
            update,
        );

        this.updateElement();
        this.restoreListeners();
    }

    restoreListeners() {
        throw new Error('Abstract method not implemented: restoreListeners');
    }
}