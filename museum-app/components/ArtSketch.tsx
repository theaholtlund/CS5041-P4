// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This file holds the components for creating an art sketch

// Import necessary components from Expo, React and React Native libraries
import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Element as p5Element } from "p5";

// Import components from other files and screens in the application
import { convertCSSToString } from "../utils";
import { CustButton } from "../components/Button";

// Define extended interface, to allow for the use of input function
interface ExtendedElement extends p5Element {
  input: (fun: Function) => void;
  color: () => {
    toString: () => string;
  };
}

// Define functionality to allow user to draw on canvas
const ArtSketch = () => {
  let canvas: p5Types.Renderer;
  let colorPicker: ExtendedElement;
  let topLevelp5: p5Types;
  const backgroundValue = 220;
  const [color, setColor] = useState("#FFB86E");

  // Setup function that only runs once, when the program starts
  // Define topLevelp5 to be able to use it in other functions
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    canvas = p5.createCanvas(500, 400).parent(canvasParentRef);
    canvas.style(convertCSSToString(styles.canvas));
    p5.background(backgroundValue);
    colorPicker = p5.createColorPicker(color) as ExtendedElement;
    colorPicker.style(convertCSSToString(styles.colorPicker));
    colorPicker.size(100, 100);
    colorPicker.parent(canvasParentRef);
    colorPicker.input(() => {
      setColor(colorPicker.color().toString());
    });

    topLevelp5 = p5;
  };

  // Function to allow the user to draw on the canvas
  const mouseDragged = (p5: p5Types) => {
    p5.noStroke();
    p5.fill(color);
    p5.ellipse(p5.mouseX, p5.mouseY, 10, 10);
    topLevelp5 = p5;
  };

  // Function to clear the canvas when button is pressed
  const clearCanvas = () => {
    topLevelp5.clear();
    topLevelp5.background(backgroundValue);
  };

  return (
    <View>
      <Sketch setup={setup} mouseDragged={mouseDragged} />
      <CustButton
        title={"Clear Canvas"}
        color={"#FF9934"}
        onPress={() => {
          clearCanvas();
        }}
      />
    </View>
  );
};

export { ArtSketch };

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
  colorPicker: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    border: "5px solid #351431",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#03312E",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
});
