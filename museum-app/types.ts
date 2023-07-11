// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This file holds the types of the application that are reusable in several locations

// Define interface for Firebase data
interface FirebaseDataBase {
  groupId: number;
  timestamp: number;
  userId: string;
  lastButton: number;
}

// Define Firebase type
type FirebaseData = FirebaseDataInteger | FirebaseDataString;

// Define Firebase data extension for integer
interface FirebaseDataInteger extends FirebaseDataBase {
  type: "int";
  integer: number;
}

// Define Firebase data extension for string
interface FirebaseDataString extends FirebaseDataBase {
  type: "str";
  string: string;
}

export { FirebaseData };
