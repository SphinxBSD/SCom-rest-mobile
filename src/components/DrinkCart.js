import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import settings from "../core/settings.json";

import { Button as PaperButton } from "react-native-paper";
import CantButton from "./CantButton";
export default function DrinkCart() {
  const [desc, setDesc] = useState("Descripcion temporal del plato");

  const Item = ({ name, url, price }) => (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: url }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}> {name}</Text>
        <Text style={styles.infoText}> {price}</Text>
        <Text>{desc}</Text>
        <CantButton></CantButton>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item name={item.brand} url={item.urlImage} price={item.price} />
  );

  const p = settings.puerto;
  const u = settings.url;
  const [menuP, setMenuP] = useState([]);
  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data2 = await fetch(u + p + "/api/drinks");
    const platosP = await data2.json();
    setMenuP(platosP);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuP}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 4,
  },
  container: {
    margin: 2,
    flexDirection: "row",
    alignItems: "stretch",
  },
  infoText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  selecc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

/**
 * <View>
        <Image
          source={require("../assets/temporal/plat1.jpg")}
          style={styles.image}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}> Costo: {cost}</Text>
        <Text style={styles.infoText}> Descripcion: </Text>
        <Text>{desc}</Text>
        <View style={styles.selecc}>
          <PaperButton icon={"minus-thick"} onPress={restar}></PaperButton>
          <Text> {cant} </Text>
          <PaperButton icon={"plus-thick"} onPress={sumar}></PaperButton>
        </View>
      </View>
 */
