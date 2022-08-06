import Abstract from "../view/abstract";

export const RenderPosition = {
    AFTERBEGIN : 'afterbegin',
    BEFOREEND: 'beforeend',
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
    if (container instanceof Abstract){
        container = container.getElement();
    }

    if (element instanceof Abstract){
        element = element.getElement();
    }

    switch(place){
        case RenderPosition.AFTERBEGIN:
            container.prepend(element);
            break;
        case RenderPosition.BEFOREEND:
            container.append(element);
            break;
    }
};

export const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
};

export const replace = (newElement, currentElement) => {
    if (currentElement instanceof Abstract) {
        currentElement = currentElement.getElement();
    }

    if (newElement instanceof Abstract) {
        newElement = newElement.getElement();
    }

    const parentElement = currentElement.parentElement;

    if(parentElement === null || currentElement === null || newElement === null) {
        throw new Error('one of the replaced elements does not exist');
    }

    parentElement.replaceChild(newElement, createElement);
};

export const remove = (component) => {
    if(!(component instanceof Abstract)){
        throw new Error('Can remove only components');
    }
    component.getElement().remove();
    component.removeElement();
};