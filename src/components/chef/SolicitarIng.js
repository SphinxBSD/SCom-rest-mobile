import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput  } from "react-native";
import settings from '../../core/settings.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttonc from './Botonnn';

const SolicitarIng = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ onChangeText] = React.useState(null);

  var arrayId  = new Array();
  var arrayAmount = new Array();

  var arrayAmountN   = new Array();
  var arrayName   = new Array();
  var arrayPrice   = new Array();
  var arrayStock   = new Array();
  
  arrayId[0] = 1;
  arrayId[1] = 2;

  
  arrayAmount[0] = 2;
  arrayAmount[1] = 2;
 
  
  arrayAmountN[0] = 500;
  arrayName[0] = "aba";
  arrayPrice[0] = 13.49;
  arrayStock[0] = 0;

  var ingredients  = [];
  var newIngredients  = [];
  var objeto = {};
  
  for(var i= 0; i < arrayId.length; i++) {
  
    ingredients.push({ 
      "amount"  : arrayAmount[i],
          "id"    : arrayId[i]  
      });
  }
  for(var i= 0; i < arrayAmountN.length; i++) {
  
    newIngredients.push({ 
       
         "amount"    : arrayAmountN[i],
         "name"    : arrayName[i],
         "price"    : arrayPrice[i],
         "stock"    : arrayStock[i],
     });
 }

  const solicitarIngredientes = async() =>{
const idChef = await AsyncStorage.getItem("id");


 objeto.chefId = idChef;
  objeto.ingredients = ingredients;
  objeto.newIngredients = newIngredients;

  const pruebaJson = JSON.stringify(objeto)
  console.log(pruebaJson);

  
    await fetch(
       settings.url + settings.puerto + "/api/ingredients/request",
       {
         method: 'POST',
         
         body: JSON.stringify(objeto),

         headers: { "Content-Type": "application/json" },
       } ).catch((error) => {
       console.log(error);
     });
 
     
       let vista = "Dashboard";
       vista = "Chef";
       props.nav.reset({
         index: 0,
         routes: [{ name: vista }],
       });
     
   
     
  }

 



 
  
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


      <Buttonc
    
        onPress={() => setModalVisible(true)}
        title = "Añadir ingrediente a la solicitud"
      />
       

      <Text style={styles.modalText2}>{"\n"}Lista de ingredientes solicitados{"\n"}{"\n"}</Text>

      <Buttonc
        
        onPress={solicitarIngredientes}
        title = "Solicitar ingredientes"

      />
   
      


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
    height: 35,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
  }
});

export default SolicitarIng;