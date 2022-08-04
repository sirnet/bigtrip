import { generateRandomArray, getRandomArrayElement, getRandomInteger, pickOffersDependOnType } from "../utils";
import { generateRandomOffers } from "./offer-data-generator";
import { TYPES, CITES, DESCRIPTION, ADRESS, PERIOD, GAP, OFFERS} from "../const";
import dayjs from "dayjs";



const generatePicture = () => {return ADRESS + Math.random()}; 

const generateDescription = (cites, interval) => {
    return {
        name: getRandomArrayElement(cites),
        description: generateRandomArray(DESCRIPTION, interval.MIN, interval.MAX).join(' '),
        pictures: new Array(getRandomInteger(interval.MIN, interval.MAX)).fill(null).map(generatePicture),
    };
};

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

export const generatePoinData = () => {
    const type = getRandomArrayElement(TYPES);
    const offers = generateRandomOffers(TYPES);
    const dateInterval = generateDate();
    return {
        type,
        offers: pickOffersDependOnType(type, offers),
        description: generateDescription(CITES, GAP),
        basePrice: getRandomInteger(PERIOD.BASE_PRICE_MIN, PERIOD.BASE_PRICE_MAX),
        dateFrom: dateInterval.dateFrom,
        dateTo: dateInterval.dateTo,
        isFavorite: Boolean(getRandomInteger()),
    };
};