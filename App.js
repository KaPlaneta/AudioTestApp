import * as React from "react";
// import { Text, View, StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SecondScreen from "./SecondScreen";
import FirstScreen from "./FirstScreen";
import ThirdScreen from "./ThirdScreen";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={FirstScreen}
        />

        <Stack.Screen
          name="SecondScreen"
          options={{ headerShown: false }}
          component={SecondScreen}
        />
        <Stack.Screen
          name="ThirdScreen"
          options={{ title: "TEST ODSŁUCHOWY" }}
          component={ThirdScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
    alignItems: "center",
    flexDirection: "column",
  },
});

export default App;
