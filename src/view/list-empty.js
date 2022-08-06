import AbstractViev from "./abstract";

const createListEmptyTemplate = () => {
    return  `<p class="trip-events__msg">Click New Event to create your first point</p>`
}

export default class ListEmpty extends AbstractViev {
    getTemplate() {
        return createListEmptyTemplate();
    }
}