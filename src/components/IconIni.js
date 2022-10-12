import React from "react";
import { Image, StyleSheet } from "react-native";
export default function IconIni() {
  return (
    <Image
      source={require("../assets/temporal/iconIni.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
});
