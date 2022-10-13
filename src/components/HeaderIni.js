import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

export default function HeaderIni() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/temporal/iconIni.png")}
      />
      <SearchBar
        style={styles.search}
        lightTheme
        round
        placeholder="Escriba aqui..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    heigh: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 40,
    height: 40,
    margin: 4,
  },
  search: {
    width: "100%",
  },
});
