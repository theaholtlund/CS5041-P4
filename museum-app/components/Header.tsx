// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This file holds the components for creating the headers

// Import necessary components from Expo, React and React Native libraries
import React from "react";
import { Text, StyleSheet } from "react-native";

// Define props for the header
type Props = {
  text: string;
};

// Define a header to be used for all screens
const Header = (props: Props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

// Define styling for the components in the file
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 30,
  },
});

export { Header };
