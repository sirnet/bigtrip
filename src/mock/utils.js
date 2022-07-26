import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const DAYS_COUNT = 10;

const TimeFormat = {
    MINUTES_PER_DAY: 1440,
    MINUTE_PER_HOUR: 60,
    MILLISECOND_PER_MINUTE: 60000,
};

export const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
  
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => {
    return array[(getRandomInteger(0, (array.length - 1)))];
};


/* Подумать как переделать */
export const generateRandomArray = (array, minLength = 0, maxLength = array.length) => {
    let temp;
    let j;
    for (let i = array.length - 1; i > 0; i--) {
        j = getRandomInteger(0, i);
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    array.length = getRandomInteger(minLength, maxLength);
    return array;
};

export const pickOffersDependOnType = (type, offers) => {
    return offers.find((item) => item.type === type).offers;
};

const dateConverter = {
    'D MMM': (data) => dayjs(date).format('D MMM'),
    'HH:mm': (date) => dayjs(date).format('HH:mm'),
    'YYYY-MM-DDTHH:mm': (date) => dayjs(date).format('YYYY-MM-DDTHH:mm'),
    'DD/MM/YY HH:mm': (date) => dayjs(date).format('DD/MM/YY HH:mm'),
};

export const humanizeDate = (date, format = 'HH:mm') => dateConverter[format](date);

export const compareTwoDates = (dateA, dateB) => dayjs(dateA).diff(dateB);

export const getTimeDuration = (initialDate, expirationDate) => {
    const difference = compareTwoDates(expirationDate, initialDate);
    const duration = dayjs.diff(difference);

    const day = duration.days < DAYS_COUNT ? `0${duration.days}D` : `${duration.days}D`;
    const hour = duration.hours < DAYS_COUNT ? `0${duration.hours}H` : `${duration.hours}H`;
    const minute = duration.minutes < DAYS_COUNT ? `0${duration.minutes}M` : `${duration.minutes}M`;
    
    const total = (difference / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.MINUTES_PER_DAY ? `${day} ${hour} ${minute}` :
    (difference / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.MINUTE_PER_HOUR ? `{hour} ${minute}` : minute;
    
    return total;
};

export const isDateExpired = (date) => dayjs().isAfter(date, 'm');
export const isDateInFuture = (date) => dayjs().isBefore(date, 'm');
export const isDateCurrent = (date) => dayjs().isSame(date, 'm');

export const isEventContinues = (dateFrom, dateTo) => isDateExpired(dateFrom) && isDateInFuture(dateTo);



