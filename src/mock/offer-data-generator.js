import { getRandomInteger } from "./utils";
import { OFFERS } from "./const";


export const getOffersRandom = (vol) => {
    const array = [];
    for (let i = 0; i <= vol; i++){
        array[i] = OFFERS[getRandomInteger(0,7)];
    };

    return array;
};

export const getDayGeneration = () => {

};