import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import { Button as PaperButton } from "react-native-paper";

export default function CantButton(props) {
  const [elem, setElem] = useState(props.lista);
  const [idC, setIdC] = useState(props.id);

  console.log(props.map.get(idC));
  console.log("=====================");
  return (
    <View style={styles.selecc}>
      <PaperButton
        icon={"minus-thick"}
        onPress={() => {
          props.oper(idC, "-");
        }}
      ></PaperButton>
      <Text> {props.map.get(idC)}</Text>
      <PaperButton
        icon={"plus-thick"}
        onPress={() => {
          props.oper(idC, "+");
        }}
      ></PaperButton>
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
