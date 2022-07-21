import { getRandomInteger } from "./utils";
import { getOffersRandom } from "./offer-data-generator";
import { TYPES, CITES, DESCRIPTION, DateFormat } from "./const";

let id = 0;

const getDescription = () => {
    return [
        {
            "description": DESCRIPTION[getRandomInteger(0,4)],
            "name": CITES[getRandomInteger(0,5)],
            "pictures": [
                {
                    "src": "http://picsum.photos/248/152?r=" + Math.floor(Math.random()),
                    "description": "Chamonix parliament building"
                }
            ]
        }
    ]
};

export const getPointArray = () => {
    id += 1;
    return {
        "base_price": getRandomInteger(1, 1500),
        "date_from": "",
        "date_to": "",
        "destination": getDescription(),
        "id" : id,
        "is_favorite": Boolean(getRandomInteger(0,1)),
        "offers" : getOffersRandom(getRandomInteger(0,1)),
        "type": TYPES[getRandomInteger(0,8)]
    };
};

