import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";

export default function ModalPicker(props) {
  const OPTIONS = [];

  for (let i = 0; i < props.mesa.length; i++) {
    OPTIONS.push(props.mesa[i].number);
    console.log(props.mesa[i].number);
  }

  const onPressItem = (option) => {
    props.changeModalVisibility(false);
    props.setData(option);
  };
  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>Mesa: {item}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={styles.container}
    >
      <View style={[styles.modal, { width: 150, height: 400 }]}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "gray",
  },
  option: {
    alignItems: "flex-start",
  },
  text: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
