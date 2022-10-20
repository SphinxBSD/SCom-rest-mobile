import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import settings from "../core/settings.json";

export default function Pedidos() {
  const [ord, setOrd] = useState([]);
  const [texto, setTexto] = useState("Vacio");
  const [idUser, setIdUser] = useState();
  const p = settings.puerto;
  const u = settings.url;

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    let id = await AsyncStorage.getItem("id");
    const data2 = await fetch(
      u + p + "/api/customers/" + id + "/orders/not-billed"
    );
    const ordenes = await data2.json();
    setIdUser(id);
    setOrd(ordenes);
  };

  const ordenes = () => {
    obtenerDatos();
    setTexto("vacio");
    let aux = "";
    for (let i = 0; i < ord.length; i++) {
      if (idUser == ord[i].customer.id) {
        aux = aux + ord[i].id + ".";
      }
    }
    setTexto(aux);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={ordenes} style={styles.btn}>
        <Text>Pedido(s) solicitado(s): </Text>
      </TouchableOpacity>
      <Text>{texto}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    //backgroundColor: "#0a0a0f",
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
