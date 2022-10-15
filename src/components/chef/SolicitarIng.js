import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput  } from "react-native";

const SolicitarIng = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ onChangeText] = React.useState(null);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText2}>Solicitar nuevo ingrediente</Text>
            <TextInput style={styles.input} onChangeText={onChangeText}  placeholder="Ingrediente"/>
            <Text style={styles.modalText}>Nombre</Text>
            <TextInput style={styles.input} onChangeText={onChangeText}  placeholder="Precio"/>
            <Text style={styles.modalText}>Precio</Text>
            <TextInput style={styles.input}  keyboardType="numeric" onChangeText={onChangeText}  placeholder="Cantidad"/>
            <Text style={styles.modalText} >Cantidad</Text>
            <Pressable
              style={[styles.button, styles.buttonClose2]}
              onPress={() => setModalVisible(!modalVisible)}
            
            >
              <Text style={styles.textStyle}>Añadir</Text>
            </Pressable>
            <Text style={styles.textStyle}>{"\n"}</Text>

            <Text style={styles.modalText2}>Solicitar ingrediente existente</Text>
            <TextInput style={styles.input} onChangeText={onChangeText}  placeholder="Ingrediente"/>
            <Text style={styles.modalText}>Nombre</Text>
            <TextInput style={styles.input}  keyboardType="numeric" onChangeText={onChangeText}  placeholder="Cantidad"/>
            <Text style={styles.modalText} >Cantidad</Text>
            <Pressable
              style={[styles.button, styles.buttonClose2]}
              onPress={() => setModalVisible(!modalVisible)}
            
            >
              <Text style={styles.textStyle}>Solicitar</Text>
            </Pressable>
            <Text style={styles.textStyle}>{"\n"}</Text>


            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Volver</Text>
            </Pressable>


          </View>
        </View>
      </Modal>


      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Adicionar nuevo ingrediente</Text>
      </Pressable>
    </View>



  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

  buttonOpen: {
    backgroundColor: "#736969",

  },
  buttonClose: {
    backgroundColor: "#736969",
    width: 180,
    marginBottom: 3,
  },
  buttonClose2: {
    backgroundColor: "#FF0000",
    width: 180,
    marginBottom: 3,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:11,
    marginBottom: 3,
    textAlign: "left"
  },
  modalText2: {
    fontSize:15,
    marginBottom: 3,
    textAlign: "left"
  },
  input: {
    height: 40,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
  }
});

export default SolicitarIng;