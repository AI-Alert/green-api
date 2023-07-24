const isNumeric = (value) => {
    return typeof value === 'number' && isFinite(value);
};
const isValidNumericArray = (array) => {
    return Array.isArray(array) && array.every(isNumeric);
};

module.exports = isValidNumericArray;
