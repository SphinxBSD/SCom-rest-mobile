import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DrinkCart from "./DrinkCart";
import FoodCart from "./FoodCart";
import { Button as PaperButton } from "react-native-paper";

export default function RequestStock() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Realice su pedido</Text>
      <PaperButton style={styles.btn1}>
        <Text style={styles.text}>ORDENAR</Text>
      </PaperButton>
      <PaperButton style={styles.btn2}>
        <Text style={styles.text}>CANCELAR</Text>
      </PaperButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn1: {
    margin: 2,
    backgroundColor: "#9ca832",
  },
  btn2: {
    margin: 2,
    backgroundColor: "#a84432",
  },
  text: {
    fontWeight: "bold",
  },
});
