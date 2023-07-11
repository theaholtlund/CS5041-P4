// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This file holds the components for creating a button

// Import necessary components from Expo, React and React Native libraries
import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { GestureResponderEvent } from "react-native";

// Define props for the button
type Props = {
  onPress: (event: GestureResponderEvent) => void;
  color: string;
  title: string;
  icon?: string;
  children?: string;
};

// Define a header to be used for all screens
const CustButton = (props: Props) => {
  return (
    <View style={styles.button}>
      <Button color={props.color} title={props.title} onPress={props.onPress} />
    </View>
  );
};

// Define styling for the components in the file
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF9934",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
});

export { CustButton };
