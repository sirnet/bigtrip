import { getRandomInteger } from "./utils";
import { getOffersRandom } from "./offer-data-generator";


let id = 0;

export const getPointArray = () => {
    id += 1;
    return {
        "base_price": getRandomInteger(1, 1500),
        "date_from": "",
        "date_to": "",
        "destination": "",
        "id" : id,
        "is_favorite": Boolean(getRandomInteger(0,1)),
        "offers" : getOffersRandom(getRandomInteger(0,1))
    };
};

