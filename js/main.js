const getRandomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));
getRandomInteger(0, 3);

const getLengthComparison = (lineLength, maxLineLength) => lineLength <= maxLineLength;
getLengthComparison(25, 140);
