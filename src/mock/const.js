const TYPES = ['taxi', 'bus', 'train', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITES = ['Cartagena', 'Santiago', 'Tortuga', 'Jamaica', 'Barbaros', 'Havana'];

const DateFormat = {
    DAY_MONTH: 'D MMM',
    HOUR_MINUTE: 'hh:mm',
    ISO: 'YYYY-MM-DDTHH:mm',
    DATE_HOUR: 'DD/MM/YY HH:mm',
};

const DESCRIPTION = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",
    "Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.",
    "Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.",
    "Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus."
]

const OFFERS = [
    {
        title: 'Rent a car',
        price: '200',
    },
    {
        title: 'Add luggage',
        price: '30',
    },
    {
        title: 'Switch to comfort',
        price: '100',
    },
    {
        title: 'Order Uber',
        price: '20',
    },
    {
        title: 'Add breakfast',
        price: '50',
    },
    {
        title: 'Add meal',
        price: '15',
    },
    {
        title: 'Choose seats',
        price: '5',
    },
    {
        title: 'Travel by train',
        price: '40',
    },
];

export {TYPES, CITES, DESCRIPTION, DateFormat, OFFERS};