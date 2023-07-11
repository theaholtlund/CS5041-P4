// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This screen is for interacting with art, allowing the user to draw using the p5.js library

// Import necessary components from Expo, React and React Native libraries
import React from "react";
import p5Types from "p5";
import { View, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { User } from "firebase/auth";

// Import components from other files and screens in the application
import { Header } from "../components/Header";
import { ArtSketch } from "../components/ArtSketch";

// Define props for the art display, using p5Types
interface ArtProps {
  p5Types?: p5Types;
}

// Define functional component to display art drawn by the user
const Art = ({ user }: { user?: User | null } & ArtProps) => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View>
            <Header
              text={
                "Draw something cool for the museum! To clear the canvas, click the 'Clear Canvas' button."
              }
            />
            <ArtSketch />
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
};

// Define styling for the components in the file
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default Art;
