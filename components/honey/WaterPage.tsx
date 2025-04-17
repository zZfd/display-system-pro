import React from "react";
import { ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
const WaterPage = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <ImageBackground
          source={require("@/assets/images/honey/honey-water-bg.png")}
          resizeMode="contain"
          style={styles.backgroundImage}
        >
          {/* <Text style={styles.text}>Inside</Text> */}
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default WaterPage;
