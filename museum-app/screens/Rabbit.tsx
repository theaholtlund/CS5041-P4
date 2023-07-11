// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This screen is for voting between whether the small rabbit should go to the Grey or White Rabbit

// Import necessary components from Expo, React and React Native libraries
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Card, Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

// Import necessary components from Firebase SDK and Firebase related libraries
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  limitToLast,
} from "firebase/database";
import { User } from "firebase/auth";

// Import components from other files and screens in the application
import { Header } from "../components/Header";
import { FIREBASE_DB } from "../Firebase";
import { FirebaseData } from "../types";

// Define functional component to display votes between Grey Rabbit and White Rabbit
const Rabbit = ({ user }: { user?: User | null }) => {
  const [cards, setCards] = useState<JSX.Element[]>([]);

  // Get snapshots for Grey Rabbit and White Rabbit
  useEffect(() => {
    if (user) {
      const dbRef = ref(FIREBASE_DB, "data");
      const greyQueryRef = query(
        dbRef,
        orderByChild("groupId"),
        equalTo(8),
        limitToLast(10)
      );
      const whiteQueryRef = query(
        dbRef,
        orderByChild("groupId"),
        equalTo(9),
        limitToLast(10)
      );

      // Process Grey Rabbit data with onValue, to trigger action when data at the location changes
      onValue(greyQueryRef, (snapshot) => {
        const greyData = snapshot.val() as FirebaseData[];
        console.log("Grey Data", greyData);

        const greyValues = Object.values(greyData).flatMap((data) => {
          if (data.type === "int") return data.integer;
        });
        console.log("Grey Values", greyValues);

        const greyLastValues = greyValues.filter((value) => value === 1);
        console.log("Grey Last Values", greyLastValues);

        const greyCards = greyLastValues.map(() => (
          <Card
            // Give each card a unique key
            key={Math.random()}
            style={{
              ...styles.cardContainer,
              backgroundColor: "#A4A4A4",
            }}
          >
            <Text style={styles.cardText}>
              Someone touched the Grey Rabbit. One vote for Grey!
            </Text>
          </Card>
        ));

        // Append new cards to existing cards array
        setCards((prevCards) => [...prevCards, ...greyCards]);
      });

      // Process White Rabbit data with onValue, to trigger action when data at the location changes
      onValue(whiteQueryRef, (snapshot) => {
        const whiteData = snapshot.val() as FirebaseData[];
        console.log("White Data", whiteData);

        const whiteValues = Object.values(whiteData).flatMap((data) => {
          if (data.type === "int") return data.integer;
        });
        console.log("White values", whiteValues);

        const whiteLastValues = whiteValues.filter((value) => value === 1);
        console.log("White Last Values", whiteLastValues);

        const whiteCards = whiteLastValues.map(() => (
          <Card
            // Give each card a unique key
            key={Math.random()}
            style={{
              ...styles.cardContainer,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Text style={styles.cardText}>
              Someone touched the White Rabbit. One vote for White!
            </Text>
          </Card>
        ));

        // Append new cards to existing cards array
        setCards((prevCards) => [...prevCards, ...whiteCards]);
      });
    }
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header
          text={
            "See how the museum goers are voting between Grey and White Rabbit!\n" +
            "When the museum goers choose between Grey and White Rabbit, you will see the results displayed here."
          }
        />
        <View style={styles.container}>{cards}</View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
};

// Define styling for the components in the file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    height: 150,
    width: "20%",
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
  },
  safeArea: {
    flex: 1,
  },
});

export default Rabbit;
