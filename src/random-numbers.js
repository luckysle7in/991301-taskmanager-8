// Get random number from 0 to MAX
const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// Get random boolean
const getRandomBoolean = () => {
  const variants = [true, false];
  return variants[getRandomNumber(2)];
};

export {getRandomNumber, getRandomBoolean};
