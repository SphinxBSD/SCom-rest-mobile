import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Alert } from 'react-native';
import settings from '../../core/settings.json';

import Button from "../../components/Button";


const Item = ({  id , products}) => (

 
 
  <View style={styles.item}>
    
    {/* <Image 
    source={{ uri: urlImage  }}
    
    style={styles.image} /> */}
    <Text style={styles.name}>Pedido Nro: {id}</Text>

  

      {
        products.map((name) => (
          <Text style={styles.name}>Nombre del plato: {name.nameOrBrand}{"\n"}Cantidad: {name.amount}</Text>
        ))
      }


  <Button  style={styles.botonchef}>

  <Text style={styles.name2}>Preparado</Text>
       
        
        </Button>
 

  </View>
);





const ListaOrdenes = () => {


  const renderItem = ({ item }) => (
    
      <Item id={item.id} products={item.products}  />
  );



  const p = settings.puerto;
  const u = settings.url;
  const [menuP,setMenuP] = useState([])
  useEffect(() => {
     obtenerDatos()
  },[]);
  
  const obtenerDatos= async() =>
  {
    const data2 = await fetch(u+p+'/api/orders')
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
    width: 200, height: 120,
    marginTop: StatusBar.currentHeight || 0,
  },
  container2: {
    width: 200, height: 150,
    alignContent: "center",
  },
  item: {
    backgroundColor: '#C3BAB8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignContent: "center",
  },
  name: {
    fontSize: 12,
    textAlign: "center",
  },
  name2: {
    fontSize: 11,
    lineHeight: 26,

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

export default ListaOrdenes;