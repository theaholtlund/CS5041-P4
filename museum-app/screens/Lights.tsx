// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This screen allows a user to set the color of the lights in the museum, using their Micro:bit

// Import necessary components from Expo, React and React Native libraries
import React from "react";
import p5Types from "p5";
import Sketch from "react-p5";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";

// Import necessary components from Firebase SDK and Firebase related libraries
import { User } from "firebase/auth";
import { ref, push, serverTimestamp } from "firebase/database";

// Import components from other files and screens in the application
import { FIREBASE_DB } from "../Firebase";
import { convertCSSToString } from "../utils";
import { Header } from "../components/Header";

// Define functional component to set the color of the lightbulbs, using the Micro:bit
const Lights = ({ user }: { user?: User | null }) => {
  let canvas: p5Types.Renderer;
  let port: any;
  let connectBtn: any;
  let hue = 0;
  let saturation = 0;
  let brightness = 0;

  // Create functio to set up canvas and Micro:bit functionality
  // Setup function that only runs once, when the program starts
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    canvas = p5.createCanvas(400, 400).parent(canvasParentRef);
    canvas.style(convertCSSToString(p5Styles.canvas));
    p5.background(220);
    p5.colorMode("HSB", 360, 100, 100);

    // @ts-ignore, this is necessary because p5.webserial library is imported through script tag
    // Prototype function is not recognised by TypeScript
    port = p5.createSerial();

    // @ts-ignore, this is necessary because p5.webserial library is imported through script tag
    // Prototype function is not recognised by TypeScript
    let usedPorts = p5.usedSerialPorts();
    if (usedPorts.length > 0) {
      port.open(usedPorts[0], 115200);
    }

    // Define values for connecting to the Micro:bit
    connectBtn = p5.createButton("Connect to Micro:bit");
    connectBtn.style(convertCSSToString(p5Styles.button));
    connectBtn.mousePressed(connectBtnClick);
    connectBtn.parent(canvasParentRef);

    // Let the user connect and disconnect the Micro:bit
    function connectBtnClick() {
      if (!port.opened()) {
        port.open("MicroPython", 115200);
      } else {
        port.close();
      }
    }
  };

  // Trim the inputs to make input equal to character, as it is sent over Web Serial
  const draw = (p5: p5Types) => {
    let str = port.readUntil("\n").trim();
    if (str.length > 0) {
      if (str === "a") {
        console.log(hue);
        // Reset Hue back to 0 once it reaches a value above 360
        hue = (hue + 10) % 370;
        push(ref(FIREBASE_DB, "data"), {
          userId: user?.uid,
          groupId: 21,
          timestamp: serverTimestamp(),
          type: "int",
          integer: hue,
        });
      } else if (str === "b") {
        console.log(saturation);
        // Reset Saturation back to 0 once it reaches a value above 100
        saturation = (saturation + 10) % 110;
        push(ref(FIREBASE_DB, "data"), {
          userId: user?.uid,
          groupId: 22,
          timestamp: serverTimestamp(),
          type: "int",
          integer: saturation,
        });
      } else if (str === "p") {
        console.log(brightness);
        // Reset Brightness back to 0 once it reaches a value above 100
        brightness = (brightness + 10) % 110;
        push(ref(FIREBASE_DB, "data"), {
          userId: user?.uid,
          groupId: 23,
          timestamp: serverTimestamp(),
          type: "int",
          integer: brightness,
        });
      }

      p5.fill(hue, saturation, brightness);
      p5.ellipse(200, 200, 150, 200); // Bulb shape
    }

    // Changes the button label based on connection status of Micro:bit
    if (!port.opened()) {
      connectBtn.html("CONNECT TO MICRO:BIT");
    } else {
      connectBtn.html("DISCONNECT");
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <View>
          <Header
            text={
              "Change the colour of the lights in the museum using your Micro:Bit!\n" +
              "Press button A to turn up Hue. It will go up by 10 every time you press the button, until it reaches its maximum value of 360, and it will then reset to 0 again on the next press.\n" +
              "Press button B to turn up Saturation. It will go up by 10 every time you press the button, until it reaches its maximum value of 100, and it will then reset to 0 again on the next press.\n" +
              "Press the Micro:bit logo to turn up Brightness. It will go up by 10 every time you press the button, until it reaches its maximum value of 100, and it will then reset to 0 again on the next press.\n"
            }
          />
          <Sketch setup={setup} draw={draw} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
};

// Define styling for the components in the file
const p5Styles = {
  canvas: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    border: "10px solid #351431",
    borderRadius: 10,
  },
  button: {
    color: "#FFFFFF",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FF9934",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingRight: "60px",
    paddingLeft: "60px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Lights;
