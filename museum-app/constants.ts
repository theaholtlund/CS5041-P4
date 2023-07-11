// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This file holds the constants for the application

// Define interface for predefined reviews
interface PredefinedReviews {
  [key: number]: string;
}

// Define values for the options in reviews
const predefinedReviews: PredefinedReviews = {
  1: "Greatest museum ever!",
  2: "Mediocre at best, I was bored.",
  3: "Hated it, would not recommend!",
};

export { predefinedReviews };
