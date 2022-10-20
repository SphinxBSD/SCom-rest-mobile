import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput,FlatList,SafeAreaView  } from "react-native";
import settings from '../../core/settings.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttonc from './Botonnn';
import { RefreshControl } from "react-native-web";


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

var tamtot = 0;

var newIngredientsM  = [];



const solicitudNocomp = () =>{
  Alert.alert(
    "Éxito",
    "Solicitud vacía, ingrese los ingredientes a solicitar",
    [
     
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
    
  );
  console.log("noConfirm")
  }


const solicitudcomp = () =>{
  Alert.alert(
    "Éxito",
    "Se realizó la solicitud de ingredientes correctamente",
    [
     
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
    
  );
  console.log("confirmTot")
  }

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


    const eliminado = () =>{
    Alert.alert(
      "Error",
      "Ingrediente eliminado satisfactoriamente de la solicitud",
      [
       
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
      
    );
    console.log("error inex")
    }



const SolicitarIng = (props) => {
  const [modalVisible, setModalVisible] = useState(false);


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

    ingred.map((ing) => (
    
      arrayNameOrg.push(ing.name)
 

))
  
 



 

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
  tamtot++
  console.log(arrayName)
  console.log(arrayAmountN)
  console.log(arrayPrice)
  console.log(arrayStock)



  alertConfirmado()
  setModalVisible(!modalVisible)

  newIngredientsM.push({ 
    "idee"    : tamtot,
    "amount"    : amountNew.value,
    "name"    : namess.value,
    "price"    : priceNew.value,
    "stock"    : 0,
});

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
    tamtot++
    console.log(arrayAmount)
    console.log(arrayId)
 
  
    alertConfirmado()
    setModalVisible(!modalVisible)
    
    newIngredientsM.push({ 
      "idee"    : tamtot,
      "amount"    : amountOld.value,
      "name"    : nameOld.value,
      "price"    : null,
      "stock"    : null,
  });
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

if(ingredients.length==0 && newIngredients.length==0)
{
  solicitudNocomp()
}
else
{

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
          newIngredientsM.pop()
     }

     for(var i= 0; i < tamexs; i++) {
      arrayAmount.pop()
      arrayId.pop()
      newIngredientsM.pop()
 }
     tamnew=0
     tamexs=0
     tamtot=0

     solicitudcomp()
}
 

   
  }


  const Item = ({   id, name, price ,amount,idee, nav}) => (


    ingreverf({id:id,name:name,price:price,amount:amount,idee:idee, nav:nav}));
    


    function ingreverf(props) {
if(props.price==null)
{
  return(
 
    

      <View  style={styles.item}>
        
        
        <Text   style={styles.name3}>Nombre: {props.name}</Text>
        <Text  style={styles.name3}>Cantidad: {props.amount}</Text>
  
        
 
        
      
        
        <Buttonc
          
          onPress={  async() =>{
            var pos = 0;
            for (let i = 0; i < newIngredientsM.length; i++) {
             if(newIngredientsM[i].idee==props.idee)
             {
              pos = i;
              i = newIngredientsM.length;
             }
              
            }
            var nomb = newIngredientsM[pos].name
            var pos2 = arrayNameOrg.indexOf(nomb);
            pos2++
            var pos3 = arrayId.indexOf(pos2);
         


            arrayId.splice(pos3,1);
            arrayAmount.splice(pos3,1);
  
            console.log(pos)
            console.log(newIngredientsM)

           newIngredientsM.splice(pos,1)
   
              tamnew--;
              eliminado()

              let vista = "Chef";
              props.nav.reset({
                index: 0,
                routes: [{ name: vista }],
              });
          
          }}
          title = "Eliminar"
  
        />
  
      </View>
 
  );
}
else
{
  return(

    <View  style={styles.item}>
        
        
    <Text  style={styles.name3}>Nombre: {props.name}</Text>
    <Text  style={styles.name3}>Cantidad: {props.amount}</Text>

    
<Text style={styles.name3}>Precio: {props.price}</Text>
    
  
    
    <Buttonc
      
      onPress={  async() =>{
        var pos = 0;
        for (let i = 0; i < newIngredientsM.length; i++) {
         if(newIngredientsM[i].idee==props.idee)
         {
          pos = i;
          i = newIngredientsM.length;
         }
          
        }
        var nomb = newIngredientsM[pos].name
        var pos2 = arrayName.indexOf(nomb);
        
      
   
        arrayName.splice(pos2,1);
        arrayAmountN.splice(pos2,1);
        arrayPrice.splice(pos2,1);
        arrayStock.splice(pos2,1);

        console.log(props.idee) 
        console.log(pos)
            console.log(newIngredientsM)

       newIngredientsM.splice(pos,1)
          tamnew--;
       eliminado()

       let vista = "Chef";
       props.nav.reset({
         index: 0,
         routes: [{ name: vista }],
       });

      }}
      title = "Eliminar"

    />

  </View>
  );
}
    }

  



  const renderItem = ({ item }) => (
    
    <Item  id={item.id} name={item.name} price={item.price} stock={item.stock} amount={item.amount} idee={item.idee} nav={props.nav}/>
);




  
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
              <Text style={styles.textStyle2}>Solicitar</Text>
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
              <Text style={styles.textStyle2}>Solicitar</Text>
            </Pressable>
            <Text style={styles.textStyle}></Text>


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
       

      <Text style={styles.modalText2}>{"\n"}Lista de ingredientes solicitados{"\n"}</Text>
    
      <SafeAreaView style={styles.container}>
      <View style={styles.container2}> 
      <FlatList
        data={newIngredientsM}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        horizontal={true}
        
      />
      </View>
    </SafeAreaView>
    <Text>{"\n"}</Text>
    <Text>{"\n"}</Text>
  
     

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
  item: {
    backgroundColor: '#C3BAB8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignContent: "center",
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
  name3: {
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    width: 280, height: 100,

  },
  container2: {
    width: 280, height: 160,
    backgroundColor:"#736969",
    
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
    backgroundColor: "#C3BAB8",
    width: 180,
    marginBottom: 3,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle2: {
    color: "black",
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
    width: 200,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
  }
});

export default SolicitarIng;