// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This file holds the details and authentication information for the Firebase Database

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// Connect to existing Firebase Database, add details here
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const FIREBASE_TOKEN = "Add token here";
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FUNCTONS = getFunctions(FIREBASE_APP);
