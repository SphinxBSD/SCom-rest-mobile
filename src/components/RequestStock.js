import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import settings from "../core/settings.json";

export default function RequestStock(props) {
  // aqui se crea el array

  console.log("holi");
  const p = settings.puerto;
  const u = settings.url;

  const putData = async (pd) => {
    let url = u + p + "/api/orders";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pd),
    });

    const salida = await response.json();
    console.log(salida);

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(props.comida);
    console.log(props.bebida);
  };

  const ordenar = async () => {
    let id = await AsyncStorage.getItem("id");
    // aqui
    const prods = props.comida
      .concat(props.bebida)
      .filter((elem) => elem.amount > 0);

    let pd = {
      customer: { id: id },
      products: prods,
      table: { id: props.nroM },
    };
    putData(pd);
    console.log(pd);
  };
  const cancelar = () => {
    props.reiniciar();
    props.setComidas([]);
    props.setBebidas([]);

    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLL");
    console.log(props.comida);
    console.log(props.bebida);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Realice su pedido</Text>
      <PaperButton mode="outlined" style={styles.btn1} onPress={ordenar}>
        <Text style={styles.text}>ORDENAR</Text>
      </PaperButton>
      <PaperButton style={styles.btn2} onPress={cancelar}>
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
