import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Alert } from 'react-native';
import settings from '../../core/settings.json';



function ingredientt(props) {


 
    return ( <View style={styles.item}>
    
    
      <Text style={styles.name3}>Nombre: {props.name}  </Text>
      <Text style={styles.name3}>Stock: {props.stock}</Text>
      <Text style={styles.name3}>Precio: {props.price}</Text>
    </View>);
  
 
}

const Item = ({  id,name, stock ,price}) => (
ingredientt({id:id,name:name,stock:stock,price:price}));

 



const ListaIngredientes = () => {

  const renderItem = ({ item }) => (
    
      <Item id={item.id} name={item.name} stock={item.stock} price={item.price} />
  );

  const p = settings.puerto;
  const u = settings.url;
  const [menuP,setMenuP] = useState([])
  useEffect(() => {
     obtenerDatos()
  },[]);
  
  const obtenerDatos= async() =>
  {
    const data2 = await fetch(u+p+'/api/ingredients')
    const platosP = await data2.json()
    setMenuP(platosP)
  }

  return (
  
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}> 
      <FlatList
        data={menuP}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      
      />
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 280, height: 120,

  },
  container2: {
    width: 280, height: 220,
    backgroundColor:"#736969",
    
  },
  item: {
    backgroundColor: '#C3BAB8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  
  },
  name: {
    fontSize: 12,
    textAlign: "center",
  },
  name2: {
    fontSize: 11,
    lineHeight: 26,

  },
  name3: {
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
    alignContent: "center",
  },
  botonchef: {
    width: 100,
    height: 50,
    marginVertical: 0,
    paddingVertical: 0,
  
 textAlignVertical:"top",
 alignContent:"top",
    borderColor:'black',
    borderWidth:2,
  
  },


});

export default ListaIngredientes;