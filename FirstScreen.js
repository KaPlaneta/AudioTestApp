import React from "react";
import { StorageAccessFramework } from "expo-file-system";
import * as FileSystem from "expo-file-system";

import * as MailComposer from "expo-mail-composer";

import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
  Button,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  Stack,
  ScreenComponent,
  StatusBar,
  TextInput,
} from "react-native";
import { ThemedButton } from "react-native-really-awesome-button";

function FirstScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require("./assets/testab.png")}
          style={{
            resizeMode: "contain",
          }}
        />
        <View style={styles.defaultButtonStyle}>
          <ThemedButton
            name="bruce"
            type="primary"
            activityColor="#FFFFFF"
            style={styles.button}
            onPress={() => navigation.navigate("SecondScreen")}
          >
            START
          </ThemedButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3d9af",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  buttonView: {
    width: "50%",
    padding: 10,
  },
  defaultButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,

    marginBottom: 16,
  },
  buttonBorderStyle: {
    borderWidth: 10,
    borderRadius: 1,
    borderColor: "#a82f7a",
    borderStyle: "solid",
  },
});

export default FirstScreen;
