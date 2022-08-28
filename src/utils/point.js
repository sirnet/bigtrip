import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const DAYS_COUNT = 10;

const TimeFormat = {
    MINUTES_PER_DAY: 1440,
    MINUTE_PER_HOUR: 60,
    MILLISECOND_PER_MINUTE: 60000,
};

const dateConverter = {
    'MMM D': (date) => dayjs(date).format('MMM D'),
    'HH:mm': (date) => dayjs(date).format('HH:mm'),
    'YYYY-MM-DD': (date) => dayjs(date).format('YYYY-MM-DD'),
    'YYYY-MM-DDTHH:mm': (date) => dayjs(date).format('YYYY-MM-DDTHH:mm'),
    'DD/MM/YY HH:mm': (date) => dayjs(date).format('DD/MM/YY HH:mm'),
};

export const pickOffersDependOnType = (type, offers) => {
    return offers.find((item) => item.type === type).offers;
};

export const humanizeDate = (date, format = 'HH:mm') => dateConverter[format](date);

export const compareTwoDates = (dateA, dateB) => dayjs(dateA).diff(dateB);

export const getTimeDuration = (initialDate, expirationDate) => {
    const difference = compareTwoDates(expirationDate, initialDate);
    const duration = dayjs.duration(difference).$d;
    const day = duration.day < DAYS_COUNT ? `0${duration.days}D` : `${duration.days}D`;
    const hour = duration.hours < DAYS_COUNT ? `0${duration.hours}H` : `${duration.hours}H`;
    const minute = duration.minutes < DAYS_COUNT ? `0${duration.minutes}M` : `${duration.minutes}M`;
    
    const total = (difference / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.MINUTES_PER_DAY ? `${day} ${hour} ${minute}` :
    (difference / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.MINUTE_PER_HOUR ? `${hour} ${minute}` : minute;
    
    return total;
};

export const isDateExpired = (date) => dayjs().isAfter(date, 'm');
export const isDateInFuture = (date) => dayjs().isBefore(date, 'm');
export const isDateCurrent = (date) => dayjs().isSame(date, 'm');

export const isEventContinues = (dateFrom, dateTo) => isDateExpired(dateFrom) && isDateInFuture(dateTo);

export const sortPointTime = (pointA, pointB) => {
    return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

export const sortPointPrice = (pointA, pointB) => {
    return;
}