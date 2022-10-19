import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native";
import settings from "../core/settings.json";

import ModalPicker from "./ModalPicker";

export default function Table(props) {
  const [chooseData, setChooseData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mesa, setMesa] = useState([]);

  const p = settings.puerto;
  const u = settings.url;

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const datos = await fetch(u + p + "/api/tables");
    const mesas = await datos.json();
    setMesa(mesas);
  };

  console.log(mesa);

  const setData = (option) => {
    props.setNroMesa(option);
    setChooseData(option);
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => changeModalVisibility(true)}
      >
        <Text style={styles.text}> Nro. mesa: {chooseData}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}
      >
        <ModalPicker
          changeModalVisibility={changeModalVisibility}
          setData={setData}
          mesa={mesa}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  touchableOpacity: {
    backgroundColor: "#AAAAAA",
    margin: 2,
    alignSelf: "stretch",
    width: 80,
    height: 36,
    borderRadius: 5,
  },
});
