import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Alert } from 'react-native';
import settings from '../../core/settings.json';

import Button from "../Button";

function platoverf(props) {

  if (props.available) {  
    return ( <View style={styles.item}>
    
      <Image 
      source={{ uri: props.url  }}
      
      style={styles.image} /> 
      <Text style={styles.name3}> {props.name}</Text>
  
  

    <Button  style={styles.botonchef} onPress={async() => {
  const idd = props.id;
    const deshab = {
      available: false,
      id: idd
    };
   
    await fetch(
      settings.url + settings.puerto + "/api/products/"+idd,
      {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deshab),
     
  
  
      } ).catch((error) => {
      console.log(error);
    });
    

      let vista = "Dashboard";
      vista = "Chef";
      props.nav.reset({
        index: 0,
        routes: [{ name: vista }],
      });
    
  
    }}>
  
    <Text style={styles.name2}>Deshabilitar</Text>
         
          
          </Button>
   
  
    </View>);
  }
 
}

const Item = ({  id,name, url ,available ,nav}) => (

  platoverf({id:id,name:name,url:url,available:available,nav:nav}));
 


const ListaBebidas = (props) => {
  const nn = props.nav;
  const renderItem = ({ item }) => (
    
    <Item id={item.id} name={item.brand} url={item.urlImage} available={item.available} nav={nn}/>
  );

  const p = settings.puerto;
  const u = settings.url;
  const [menuP,setMenuP] = useState([])
  useEffect(() => {
     obtenerDatos()
  },[]);
  
  const obtenerDatos= async() =>
  {
    const data2 = await fetch(u+p+'/api/drinks')
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

  },
  container2: {
    width: 200, height: 167,
    
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

export default ListaBebidas;