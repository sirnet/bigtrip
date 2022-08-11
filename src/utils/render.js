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
        default: 
            throw new Error(`Unknown render position: '${place}'`);
    }
};

export const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
};

export const replace = (newChild, oldChild) => {
    if (oldChild instanceof Abstract) {
        oldChild = oldChild.getElement();
    }

    if (newChild instanceof Abstract) {
        newChild = newChild.getElement();
    }

    const parent = oldChild.parentElement;

    if(parent === null || oldChild === null || newChild === null) {
        throw new Error('one of the replaced elements does not exist');
    }

    parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
    if(!(component instanceof Abstract)){
        throw new Error('Can remove only components');
    }
    component.getElement().remove();
    component.removeElement();
};