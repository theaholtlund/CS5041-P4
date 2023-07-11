// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This file holds the utilities for converting CSS to a string

const convertCSSToString = (stylesObject: object) => {
  const styleString = Object.entries(stylesObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join(";");
  return styleString;
};

export { convertCSSToString };
