const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
getRandomInteger(0, 3);

const getLengthComparison = (line, maxLineLength) => line.length <= maxLineLength;
getLengthComparison('Javascript is fun!', 140);
