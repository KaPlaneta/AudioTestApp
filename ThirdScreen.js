import React, { useState } from "react";
import { Audio } from "expo-av";

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
import { Picker } from "@react-native-picker/picker";
import { ThemedButton } from "react-native-really-awesome-button";

import { StorageAccessFramework } from "expo-file-system";
import * as FileSystem from "expo-file-system";

import * as MailComposer from "expo-mail-composer";

const fileUri = FileSystem.documentDirectory + "statystyki.txt";

const sendEmail = async () => {
  const { status } = await MailComposer.composeAsync({
    recipients: "<PROSZE WPISAC MAILA>",
    subject: "Subject",
    body: "Body",
    attachments: [fileUri],
  });

  if (status === "sent") {
    console.log("Email sent!");
  } else {
    console.error("Failed to send email");
  }
};

const sound1 = require("./assets/americana.wav");
const sound2 = require("./assets/americana.mp3");
const sound3 = require("./assets/americanaogg.mp3");

const sound11 = require("./assets/rock.wav");
const sound21 = require("./assets/rock.mp3");
const sound31 = require("./assets/rockogg.mp3");

const tablicaDzwiekow1 = [sound1, sound2, sound3];

const tablicaDzwiekow2 = [sound11, sound21, sound31];

const allTablice = [tablicaDzwiekow1, tablicaDzwiekow2];
const permutacje = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 0],
  [2, 0],
  [2, 1],
];
const permutacje1 = [...permutacje];

const permutacje2 = [...permutacje];

//const tab = [permutacje* allTablice.length]
const permutacjeTablic = [permutacje1, permutacje2];

let rozszerzenie1 = "wav";
let rozszerzenie2 = "mp3";

function losowanie() {
  if (permutacje1.length === 0 && permutacje2.length === 0) {
    return [0, 0];
  }
  let losowanieTablicy = Math.floor(Math.random() * allTablice.length);
  let wylosowanaTablica = allTablice[losowanieTablicy];
  let wylosowanaPermutacja = permutacjeTablic[losowanieTablicy];
  while (wylosowanaPermutacja.length === 0) {
    losowanieTablicy = Math.floor(Math.random() * allTablice.length);
    wylosowanaTablica = allTablice[losowanieTablicy];
    wylosowanaPermutacja = permutacjeTablic[losowanieTablicy];
  }

  const konkretnaPermutacjaIndex = Math.floor(
    Math.random() * wylosowanaPermutacja.length
  );
  const konkretnaPermutacja = wylosowanaPermutacja.splice(
    konkretnaPermutacjaIndex,
    1
  )[0];
  rozszerzenie1 =
    konkretnaPermutacja[0] === 0
      ? "wav"
      : konkretnaPermutacja[0] === 1
      ? "mp3"
      : "ogg";
  rozszerzenie2 =
    konkretnaPermutacja[1] === 0
      ? "wav"
      : konkretnaPermutacja[1] === 1
      ? "mp3"
      : "ogg";

  return [
    wylosowanaTablica[konkretnaPermutacja[0]],
    wylosowanaTablica[konkretnaPermutacja[1]],
  ];
}

export default function ThirdScreen() {
  const [track1, setTrack1] = React.useState();
  const [track2, setTrack2] = React.useState();

  const [sound, setSound] = React.useState();

  const [seria, setSeria] = React.useState(0);

  async function playSound(track) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(track);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    const result = losowanie();
    console.log(result);
    setTrack1(result[0]);
    setTrack2(result[1]);
  }, [seria]);

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function choose(numerDzwieku) {
    const odczyt = await FileSystem.readAsStringAsync(fileUri);
    FileSystem.writeAsStringAsync(
      fileUri,
      `${odczyt}\n Wylosowany dźwięk 1: ${rozszerzenie1}, Wylosowany dźwięk 2: ${rozszerzenie2}, Wybrany dźwięk: ${numerDzwieku}`
    );

    setSeria(seria + 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dupa}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          Jest 12 prób.{"\n"} W każdej próbie zaprezentowane zostaną 2 dźwięki.
          {"\n"}
          Proszę wybrać ten, który brzmi lepiej.
        </Text>

        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          Seria {seria}/{allTablice.length * permutacje.length}
        </Text>
      </View>
      {seria !== allTablice.length * permutacje.length && (
        <>
          <View style={styles.fixToText}>
            <Button title="Zagraj dźwięk 1" onPress={() => playSound(track1)} />
            <Button title="Zagraj dźwięk 2" onPress={() => playSound(track2)} />
          </View>
          <View style={styles.fixToText}>
            <ThemedButton
              name="bruce"
              type="primary"
              activityColor="#FFFFFF"
              style={styles.button}
              onPress={() => choose(1)}
            >
              Wybieram dźwięk 1
            </ThemedButton>

            <ThemedButton
              name="bruce"
              type="primary"
              activityColor="#FFFFFF"
              style={styles.button}
              onPress={() => choose(2)}
            >
              Wybieram dźwięk 2
            </ThemedButton>
          </View>
        </>
      )}
      <View style={styles.defaultButtonStyle}>
        <ThemedButton
          name="bruce"
          type="primary"
          activityColor="#FFFFFF"
          style={styles.button}
          onPress={() => sendEmail()}
        >
          zapisz odpowiedzi
        </ThemedButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    marginTop: 0,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e3d9af",
    flexDirection: "column",
  },
  elementContainer: {
    marginTop: 8,
  },
  dupa: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "up",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 22,
    color: "black",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  defaultButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    marginBottom: 16,
  },
});
