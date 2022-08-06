import { generateRandomArray } from "../utils/common";
import { OFFERS } from "../const";

const MAX_OFFERS_NUMBER = 5;

const generateRandomOffer = (type) => {
    return {
        type,
        offers: generateRandomArray(OFFERS, 0, MAX_OFFERS_NUMBER),
    };
};

export const generateRandomOffers = (types) => {
    let array;
    array = types.map((type) => generateRandomOffer(type));
    return array;
};
