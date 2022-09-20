import { generateRandomArray, getRandomArrayElement, getRandomInteger } from "../utils/common";
import { pickOffersDependOnType } from '../utils/point'
import { generateRandomOffers } from "./offer-data-generator";
import { TYPES, CITES, DESCRIPTION, ADRESS, PERIOD, GAP, OFFERS} from "../const";
import { nanoid } from "nanoid";
import dayjs from "dayjs";



const generatePicture = () => {return ADRESS + Math.random()}; 

const generateDescription = (cites) => {
    return {
        name: cites,
        description: generateRandomArray(DESCRIPTION, GAP.MIN, GAP.MAX).join(' '),
        pictures: new Array(getRandomInteger(GAP.MIN, GAP.MAX)).fill(null).map(generatePicture),
    };
};

export const generatedDescription = CITES.map((city) => generateDescription(city));

const createDataGenerator = () => {
    let startDate = dayjs().add(getRandomInteger(PERIOD.START_DATE_MIN, PERIOD.START_DATE_MAX), 'd');
    return () => {
        const dateFrom = dayjs(startDate).add(getRandomInteger(PERIOD.DATE_FROM_MIN, PERIOD.DATE_FROM_MAX), 'm').toDate();
        const dateTo = dayjs(dateFrom).add(getRandomInteger(PERIOD.DATE_TO_MIN, PERIOD.DATE_TO_MAX), 'm').toDate();
        startDate = dateTo;
        return {
            dateFrom,
            dateTo
        };
    };
};

const generateDate = createDataGenerator();

export const generateOffers = generateRandomOffers(TYPES);

export const generatePoinData = () => {
    const type = getRandomArrayElement(TYPES);
    const dateInterval = generateDate();
    return {
        id: nanoid(),
        type,
        offers: pickOffersDependOnType(type, generateOffers),
        description: generateDescription(getRandomArrayElement(CITES)),
        basePrice: getRandomInteger(PERIOD.BASE_PRICE_MIN, PERIOD.BASE_PRICE_MAX),
        dateFrom: dateInterval.dateFrom,
        dateTo: dateInterval.dateTo,
        isFavorite: Boolean(getRandomInteger()),
    };
};