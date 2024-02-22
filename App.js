import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { StyleSheet, Text, View } from "react-native";
import RandomNumber from "./components/random-number";
import RandomButton from "./components/random-button";
import { Audio } from "expo-av";

export default function App() {
  const [value, setValue] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tickSound, setTickSound] = useState();
  const [finallySound, setFinallySound] = useState();

  useEffect(() => {
    async function loadSound() {
      const { sound: tickSound } = await Audio.Sound.createAsync(
        require("./assets/tick.mp3")
      );
      const { sound: finallySound } = await Audio.Sound.createAsync(
        require("./assets/finally.mp3")
      );
      setTickSound(tickSound);
      setFinallySound(finallySound);
    }
    loadSound();
  }, []);

  async function generateRandomNumber() {
    if (!isGenerating) {
      setIsGenerating(true);
      let i = 0;
      let interval = setInterval(() => {
        if (i === 20) {
          clearInterval(interval);
          const randomNumber = Math.floor(Math.random() * 11);
          setValue(() => randomNumber);
          finallySound.replayAsync();
          setIsGenerating(false);
        }
        const randomNumber = Math.floor(Math.random() * 11);
        setValue(() => randomNumber);
        tickSound.replayAsync();
        i++;
      }, 100);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Random Number Generator</Text>
      </View>
      <RandomNumber number={value} />
      <RandomButton
        onPress={generateRandomNumber}
        isGenerating={isGenerating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#27324d",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    width: "100%",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "300",
  },
});
