export const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
  
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => {
    return array[(getRandomInteger(0, (array.length - 1)))];
};


/* Подумать как переделать */
export const generateRandomArray = (array, maxLength = array.length) => {
    return array.slice(getRandomInteger(maxLength));
};

export const updateItem = (items, update) => {
    return update;
};