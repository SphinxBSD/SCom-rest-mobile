import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DrinkCart from "./DrinkCart";
import FoodCart from "./FoodCart";
import { Button as PaperButton } from "react-native-paper";
import RequestStock from "../components/RequestStock";
export default function NavigatorCart(props) {
  const [sw, setSw] = useState(true);
  const [ped, setPed] = useState(props.ped);
  const [comida, setComidas] = useState(props.comida);
  const [bebida, setBebidas] = useState(props.bebida);
  const [reini, setReini] = useState(false);

  const reiniciar = () => {
    setReini(true);
    return reini;
  };

  const show = () => {
    console.log(comida);
    console.log(bebida);
    if (sw)
      return <FoodCart comida={comida} setComidas={setComidas} reini={reini} />;
    else
      return (
        <DrinkCart bebida={bebida} setBebidas={setBebidas} reini={reini} />
      );
  };

  const food = () => {
    setSw(true);
  };

  const drink = () => {
    setSw(false);
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
      <RequestStock
        comida={comida}
        bebida={bebida}
        setComidas={setComidas}
        setBebidas={setBebidas}
        ped={ped}
        reiniciar={reiniciar}
      />
      {show()}
      <Text>{console.log(props.ped)}</Text>
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
