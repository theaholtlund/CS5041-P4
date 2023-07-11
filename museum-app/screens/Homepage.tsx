// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This screen is the homepage of the application, and the first page a user will see

// Import necessary components from Expo, React and React Native libraries
import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

// Import components from other files and screens in the application
import { Header } from "../components/Header";
import { convertCSSToString } from "../utils";

// Define function for greeting new visitors on the main page
const Homepage = () => {
  let canvas: p5Types.Renderer;
  let fishbowlImg: p5Types.Image;
  let height: any;
  let width: any;

  // Define a preload function to load the image
  const preload = (p5: p5Types) => {
    fishbowlImg = p5.loadImage(require("../assets/fishbowl.jpg"));
  };

  // Setup function that only runs once, when the program starts
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    canvas = p5.createCanvas(500, 500).parent(canvasParentRef);
    canvas.style(convertCSSToString(styles.canvas));
    p5.imageMode(p5.CENTER);
    width = p5.width;
    height = p5.height;
    fishbowlImg.resize(width, height);
    p5.image(fishbowlImg, width / 2, height / 2);
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <View>
          <Header
            text={"Welcome to the Goldfish Museuem. Get ready to explore!"}
          />
          <Sketch preload={preload} setup={setup} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Homepage;

// Define styling for the components in the file
const styles = StyleSheet.create({
  canvas: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    border: "10px solid #351431",
    borderRadius: 10,
  },
});
