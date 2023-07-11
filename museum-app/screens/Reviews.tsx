// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This screen allows users to leave a review of the museum, from buttons or by writing in the app

// Import necessary components from Expo, React and React Native libraries
import React from "react";
import { useState, useEffect } from "react";
import { Button, View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider, TextInput } from "react-native-paper";

// Import necessary components from Firebase SDK and Firebase related libraries
import { User } from "firebase/auth";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  limitToLast,
  push,
  serverTimestamp,
  get,
} from "firebase/database";

// Import components from other files and screens in the application
import { FIREBASE_DB } from "../Firebase";
import { Header } from "../components/Header";
import { CustButton } from "../components/Button";
import { FirebaseData } from "../types";
import { predefinedReviews } from "../constants";

// Define functional component for a user to leave a review of the museum
const AddReview = ({ user }: { user?: User | null }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSendReview = (predefinedText?: string) => {
    if (text.length > 100) {
      setErrorMessage(
        `Maximum review length is 100 characters, but your review has ${text.length} characters`
      );
      return;
    }

    const textToSend = predefinedText ? predefinedText : text.toString();

    push(ref(FIREBASE_DB, "data"), {
      userId: user?.uid,
      groupId: 20,
      timestamp: serverTimestamp(),
      type: "str",
      string: textToSend,
    });

    console.log("halla", messages);
    console.log("textToSend", textToSend);

    setMessages((oldMessages) => [...oldMessages, textToSend]);
    setErrorMessage("");

    if (!predefinedText) {
      setText("");
    }
  };

  useEffect(() => {
    if (user) {
      const dbRef = ref(FIREBASE_DB, "data");
      const buttonRef = query(
        dbRef,
        orderByChild("groupId"),
        equalTo(5),
        limitToLast(1)
      );
      const reviewQuery = query(
        dbRef,
        orderByChild("groupId"),
        equalTo(20),
        limitToLast(10)
      );

      get(reviewQuery).then((snapshot) => {
        const reviewData = snapshot.val() as FirebaseData[];

        const reviewMessages = Object.values(reviewData)
          .map((review) => {
            if (review.type === "str") return review.string;
          })
          .filter((item): item is string => !!item);
        setMessages(reviewMessages);
      });

      onValue(buttonRef, (snapshot) => {
        const buttonData = snapshot.val() as FirebaseData[];
        console.log("Button Data", buttonData);
        const lastButton = Object.values(buttonData).flatMap((data) => {
          if (data.type === "int") return data.integer;
        }) as number[];
        console.log("Last button", lastButton);
        if (lastButton.length > 0) {
          handleSendReview(predefinedReviews[lastButton[0]]);
        }
      });
    }
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header
          text={
            "Leave us a review of the Goldfish Bowl Museum! We also made some premade reviews for you, as seen below. To post one of the premade reviews from the application, click on it. If you are in the museum, press the 1 once to post review 1, double click button 1 to post review 2 and do a long press on button 1 to post review 3. We hope you enjoyed it :)"
          }
        />
        <View style={styles.container}>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={{ margin: 10, maxHeight: 50 }}
                label="Message"
                value={text}
                onChangeText={(text) => setText(text)}
              ></TextInput>
              <CustButton
                title="Send Review"
                icon="send"
                color={"#FF9934"}
                onPress={() => handleSendReview()}
              />
            </View>
            <View style={styles.buttonContainer}>
              {Object.entries(predefinedReviews).map(([key, reviewText]) => {
                return (
                  <CustButton
                    key={key}
                    title={reviewText}
                    icon="send"
                    color={"#FF9934"}
                    onPress={() => handleSendReview(reviewText)}
                  />
                );
              })}
            </View>
          </View>

          <ScrollView style={styles.scrollView}>
            {messages.map((message, index) => (
              <View
                key={index}
                style={[styles.messageContainer, { alignSelf: "flex-end" }]}
              >
                <Text style={styles.messageText}>{message}</Text>
              </View>
            ))}
          </ScrollView>
          {errorMessage !== "" && (
            <Text style={{ color: "red" }}>{errorMessage}</Text>
          )}
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
};

// Define styling for the components in the file
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    padding: 10,
    flex: 1,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    rowGap: 20,
  },
  messageContainer: {
    backgroundColor: "#FFB86E",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    maxWidth: "75%",
  },
  messageText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default AddReview;
