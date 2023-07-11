// Module code: CS5041
// Module: Interactive Software and Hardware
// Interactive Experience for Goldfish Bowl Museum
// This page is the default loading page for the application, that will run on start

// Import necessary components from Expo, React and React Native
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import necessary components from Firebase SDK and Firebase related libraries
import "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { signInWithCustomToken } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// Import variables defined as constants for use of Firebase
import { FIREBASE_TOKEN, FIREBASE_AUTH, FIREBASE_FUNCTONS } from "./Firebase";

// Import other screens for application
import Homepage from "./screens/Homepage";
import Art from "./screens/Art";
import Lights from "./screens/Lights";
import AddReview from "./screens/Reviews";
import Rabbit from "./screens/Rabbit";

// Use interface construct to define structure of object, for getToken Cloud Function
interface ReqInterface {
  token: string;
}

interface ResInterface {
  result: string;
  token: string;
  reason: string;
}

// Create Tab Navigator for user to access the different screens
const Tab = createBottomTabNavigator();

// Define function used to sign in and authenticate user
export default function App() {
  useEffect(() => {
    const script = document.createElement("script");

    // Allow for use of Web Serial, to communcate with Micro:bit
    script.src =
      "https://unpkg.com/@gohai/p5.webserial@^1/libraries/p5.webserial.js";
    script.async = true;

    // Remove elements when they are unmounted, when they are no longer rendered on the screen
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Get current user object from Firebase auth, and any loading or error states related to authentication process
  const [user, authLoading, authError] = useAuthState(FIREBASE_AUTH);

  // Set up the getToken custom function through the useEffect hook
  useEffect(() => {
    (async () => {
      const getToken = httpsCallable<ReqInterface, ResInterface>(
        FIREBASE_FUNCTONS,
        "getToken"
      );
      const token = await getToken({ token: FIREBASE_TOKEN });

      if (token?.data.result === "ok" && token?.data.token) {
        console.log("Signed in");
        signInWithCustomToken(FIREBASE_AUTH, token?.data.token);
      } else {
        console.error(token?.data?.reason ?? "unknownError");
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Homepage" component={Homepage} />
          <Tab.Screen name="Art" component={() => <Art user={user} />} />
          <Tab.Screen name="Lights" component={() => <Lights user={user} />} />
          <Tab.Screen
            name="Reviews"
            component={() => <AddReview user={user} />}
          />
          <Tab.Screen name="Rabbit" component={() => <Rabbit user={user} />} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
