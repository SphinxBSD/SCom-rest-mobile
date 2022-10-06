import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import settings from '../../core/settings.json';



const Item = ({ name,type, urlImage }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Image 
    source={{ uri: urlImage  }}
    
    style={styles.image} />
    <Text style={styles.name}>{type}</Text>
  </View>
);

const ListaPlatos = () => {
  const renderItem = ({ item }) => (
    <Item name={item.name} type={item.type} urlImage={item.urlImage} />
  
    
  );

  const p = settings.puerto;
  const u = settings.url;
  const [menuP,setMenuP] = useState([])
  useEffect(() => {
     obtenerDatos()
  });
  
  const obtenerDatos= async() =>
  {
    const data2 = await fetch(u+p+'/api/foods')
    const platosP = await data2.json()
    setMenuP(platosP)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={menuP}
        renderItem={renderItem}
        keyExtractor={item => item.id_p}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignContent: "center",
  },
  name: {
    fontSize: 32,
    textAlign: "center",
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
    alignContent: "center",
  },

});

export default ListaPlatos;