import { generateRandomArray } from "./utils";
import { OFFERS } from "./const";

const MAX_OFFERS_NUMBER = 5;

const generateRandomOffer = (type) => {
    return {
        type,
        offers: generateRandomArray(OFFERS, 0, MAX_OFFERS_NUMBER),
    };
};

export const generateRandomOffers = (types) => {
    console.log(generateRandomOffer(types));
    return types.map((type) => generateRandomOffer(type));
};
