import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DrinkCart from "./DrinkCart";
import FoodCart from "./FoodCart";
import { Button as PaperButton } from "react-native-paper";
import RequestStock from "../components/RequestStock";
export default function NavigatorCart() {
  const [sw, setSw] = useState(true);
  const show = () => {
    if (sw) return <FoodCart />;
    else return <DrinkCart />;
  };

  const food = () => {
    setSw(true);
  };

  const drink = () => {
    setSw(false);
    console.log(sw);
  };

  return (
    <View>
      <View style={styles.container}>
        <PaperButton
          style={styles.btn}
          icon="food-drumstick"
          mode=""
          onPress={food}
        >
          <Text style={styles.text}>PLATOS</Text>
        </PaperButton>
        <PaperButton
          style={styles.btn}
          icon="glass-wine"
          mode=""
          onPress={drink}
        >
          <Text style={styles.text}>BEBIDAS</Text>
        </PaperButton>
      </View>
      <RequestStock />
      {show()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#0a0a0f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    margin: 2,
    backgroundColor: "#AAAAAA",
  },
  text: {
    fontWeight: "bold",
  },
});
