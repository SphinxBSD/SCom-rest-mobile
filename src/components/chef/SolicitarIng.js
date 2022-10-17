import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput  } from "react-native";
import settings from '../../core/settings.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttonc from './Botonnn';


// vectores nuevos ingredientes
var arrayAmountN   = new Array();
var arrayName   = new Array();
var arrayPrice   = new Array();
var arrayStock   = new Array();
var tamnew = 0;
// vectores ingredientes existentes
var arrayId  = new Array();
var arrayAmount = new Array();
var tamexs = 0;


const alertConfirmado = () =>{
Alert.alert(
  "Éxito",
  "Se agregó correctamente a la solicitud",
  [
   
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
  
);
console.log("confirm")
}

const yaExiste = () =>{
  Alert.alert(
    "Error",
    "Ya existe este ingrediente, solicitelo desde los existentes",
    [
      
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
    
  );
  console.log("error rep")
  }

  const noExiste = () =>{
    Alert.alert(
      "Error",
      "No existe este ingrediente, solicitelo desde los nuevos",
      [
       
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
      
    );
    console.log("error inex")
    }



const SolicitarIng = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ onChangeText] = React.useState(null);

  const p = settings.puerto;
  const u = settings.url;
  const [ingred,setingred] = useState([])
  useEffect(() => {
     obtenerDatos()
  },[]);
  

  
  const obtenerDatos= async() =>
  {
    const data2 = await fetch(u+p+'/api/ingredients')
    const ingredP = await data2.json()
    setingred(ingredP)
  }
  var arrayNameOrg   = new Array();
  {
    ingred.map((ing) => (

arrayNameOrg.push(ing.name) 
    ))
  }
  console.log(arrayNameOrg);



 

 const [namess, setNamess] = useState({ value: "" });
 const [amountNew, setAmountNew] = useState({ value: "" });
 const [priceNew, setPriceNew] = useState({ value: "" });

 const [nameOld, setNameOld] = useState({ value: "" });
 const [amountOld, setAmountOld] = useState({ value: "" });
 

 const addNew = async () => {

  if(arrayNameOrg.includes(namess.value))
  {
    yaExiste()
  }
else
{
  arrayName.push(namess.value)
  arrayAmountN.push(amountNew.value)
  arrayPrice.push(priceNew.value);
  arrayStock.push(0);
  tamnew++
  console.log(arrayName)
  console.log(arrayAmountN)
  console.log(arrayPrice)
  console.log(arrayStock)

  alertConfirmado()
  setModalVisible(!modalVisible)
}

}

const addOld = async () => {

  if(arrayNameOrg.includes(nameOld.value))
  {
    var ideAnt = arrayNameOrg.indexOf(nameOld.value)
    ideAnt++
    arrayId.push(ideAnt);
    arrayAmount.push(amountOld.value)
   
    tamexs++
    console.log(arrayAmount)
    console.log(arrayId)
 
  
    alertConfirmado()
    setModalVisible(!modalVisible)
    
  }
else
{
  noExiste()
}

}

  const solicitarIngredientes = async() =>{


    var ingredients  = [];
    var newIngredients  = [];
    var objeto = {};
    
    for(var i= 0; i < arrayId.length; i++) {
    
      ingredients.push({ 
        "amount"  : arrayAmount[i],
            "id"    : arrayId[i]  
        });
    }
    for(var i= 0; i < tamnew; i++) {
    
      newIngredients.push({ 
         
           "amount"    : arrayAmountN[i],
           "name"    : arrayName[i],
           "price"    : arrayPrice[i],
           "stock"    : arrayStock[i],
       });
   }

const idChef = await AsyncStorage.getItem("id");


 objeto.chefId = idChef;
  objeto.ingredients = ingredients;
  objeto.newIngredients = newIngredients;

  console.log(objeto);
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
     
       for(var i= 0; i < tamnew; i++) {
          arrayAmountN.pop()
          arrayName.pop()
          arrayPrice.pop()
          arrayStock.pop() 
     }

     for(var i= 0; i < tamexs; i++) {
      arrayAmount.pop()
      arrayId.pop()
 }
     tamnew=0
     tamexs=0
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

            <TextInput style={styles.input}  onChangeText={(text) => setNamess({ value: text })}
            placeholder="Ingrediente"/>
            <Text style={styles.modalText}>Nombre</Text>


            <TextInput style={styles.input}  keyboardType="numeric" onChangeText={(text) => setPriceNew ({ value: text })} placeholder="Precio"/>
            <Text style={styles.modalText}>Precio</Text>


            <TextInput style={styles.input}  keyboardType="numeric" onChangeText={(text) => setAmountNew({ value: text })} placeholder="Cantidad"/>
            <Text style={styles.modalText} >Cantidad</Text>

            <Pressable
              style={[styles.button, styles.buttonClose2]}
              onPress={addNew}
            
            >
              <Text style={styles.textStyle}>Solicitar</Text>
            </Pressable>

            <Text style={styles.textStyle}>{"\n"}</Text>

            <Text style={styles.modalText2}>Solicitar ingrediente existente</Text>

            <TextInput style={styles.input} onChangeText={(text) => setNameOld ({ value: text })}  placeholder="Ingrediente"/>
            <Text style={styles.modalText}>Nombre</Text>

            <TextInput style={styles.input}  keyboardType="numeric" onChangeText={(text) => setAmountOld ({ value: text })} placeholder="Cantidad"/>
            <Text style={styles.modalText} >Cantidad</Text>

            <Pressable
              style={[styles.button, styles.buttonClose2]}
              onPress={addOld}
            
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
       

      <Text style={styles.modalText2}>{"\n"}Lista de ingredientes nuevos solicitados{"\n"}{"\n"}</Text>

      <Text style={styles.modalText2}>{"\n"}Lista de ingredientes existentes solicitados{"\n"}{"\n"}</Text>

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