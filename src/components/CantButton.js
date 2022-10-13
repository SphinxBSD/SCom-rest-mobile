import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import { Button as PaperButton } from "react-native-paper";

export default function CantButton() {
  const [cant, setCant] = useState(0);
  const restar = () => {
    if (cant > 0) setCant(cant - 1);
  };
  const sumar = () => {
    setCant(cant + 1);
  };
  return (
    <View style={styles.selecc}>
      <PaperButton icon={"minus-thick"} onPress={restar}></PaperButton>
      <Text> {cant} </Text>
      <PaperButton icon={"plus-thick"} onPress={sumar}></PaperButton>
    </View>
  );
}
const styles = StyleSheet.create({
  selecc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
