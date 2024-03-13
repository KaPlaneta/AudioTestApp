import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedButton } from "react-native-really-awesome-button";

import { StorageAccessFramework } from "expo-file-system";
import * as FileSystem from "expo-file-system";

function createTextFile() {
  StorageAccessFramework.createFileAsync(
    FileSystem.documentDirectory,
    "statystyki",
    ".txt"
  );
}

const fileUri = FileSystem.documentDirectory + "statystyki.txt";

function SecondScreen({ route, navigation }) {
  const [plec, setPlec] = React.useState("Kobieta");
  const [wiek, setWiek] = React.useState(23);
  const [doswiadczenie, setDoswiadczenie] = React.useState();

  React.useEffect(() => {
    createTextFile();
  }, []);

  function writeData() {
    FileSystem.writeAsStringAsync(
      fileUri,
      `Płeć: ${plec} \n Wiek: ${wiek} \n Doświadczenie: ${doswiadczenie}`
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          // position: "absolute",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* <View> */}
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          Uzupełnij dane:
        </Text>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          Płeć:
        </Text>

        <Picker
          selectedValue={plec}
          style={{
            textAlignVertical: "center",
            textAlign: "center",
            justifyContent: "center",
            width: 200,
          }}
          onValueChange={(value) => setPlec(value)}
        >
          <Picker.Item label="Kobieta" value="Kobieta" />
          <Picker.Item label="Mężczyzna" value="Mężczyzna" />
        </Picker>

        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          Wiek:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Wpisz wiek"
          textAlign="center"
          keyboardType="numeric"
          onChangeText={(value) => setWiek(value)}
          // value={this.state.number}
        />

        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          Wykształcenie muzyczne:
        </Text>

        <Picker
          selectedValue={doswiadczenie}
          style={{
            width: 350,
          }}
          onValueChange={(value) => setDoswiadczenie(value)}
        >
          <Picker.Item label="Brak" value="Brak" />
          <Picker.Item label="Samouk" value="Samouk" />
          <Picker.Item
            label="Szkoła muzyczna I stopnia"
            value="Szkoła muzyczna I stopnia"
          />
          <Picker.Item
            label="Szkoła muzyczna II stopnia"
            value="Szkoła muzyczna II stopnia"
          />
          <Picker.Item label="Akademia muzyczna" value="Akademia muzyczna" />
          <Picker.Item label="Zawodowy muzyk" value="Zawodowy muzyk" />
        </Picker>

        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          Kliknij przycisk, aby rozpocząć test
        </Text>

        <ThemedButton
          name="bruce"
          type="primary"
          activityColor="#FFFFFF"
          style={styles.button}
          onPress={() => {
            writeData();
            navigation.navigate("ThirdScreen");
          }}
        >
          START
        </ThemedButton>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3d9af",
    flexDirection: "column",
    textAlign: "center",
    width: "100%",
  },
  elementContainer: {
    marginTop: 8,
  },
  heading: {
    fontSize: 22,
    color: "black",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SecondScreen;
