import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import settings from '../../core/settings.json';

import Buttonc from './Botonnn';

const fetchPatchRequest = async (url) => {
  const response = await fetch(url, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(null),
  });
  return response.json();
}

const Item = ({  id , products,nnn}) => (

  <View style={styles.item}>
 
    <Text style={styles.name3}>Pedido Nro: {id}</Text>
      {
        products.map((name,  index) => (



            <Text key={index} style={styles.name}>Producto: {name.nameOrBrand}{"\n"}Cantidad: {name.amount}{"\n"}{"\n"}</Text>
          

          
        ))
      }


  


  <Buttonc  style={styles.botonchef} onPress={async() => {
  const idd = id;

      let url = settings.url + settings.puerto + "/api/orders/"+idd+"?flag=prepared&value=true";
      fetchPatchRequest(url);

  
    
      let vista = "Dashboard";
      vista = "Chef";
      nnn.reset({
        index: 0,
        routes: [{ name: vista }],
      });
    
  
    }}

   
    title="Preparar"
        

     />
 
 
        </View>
);





const ListaOrdenes = (props) => {

const nn = props.nav;
  const renderItem = ({ item }) => (
    
      <Item id={item.id} products={item.products} nnn={nn}  />
  );



  const p = settings.puerto;
  const u = settings.url;
  const [menuP,setMenuP] = useState([])
  useEffect(() => {
     obtenerDatos()
  },[]);
  
  const obtenerDatos= async() =>
  {
    const data2 = await fetch(u+p+'/api/orders/all-confirmed')
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
    alignContent: "center",
    backgroundColor:"#736969",
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

  name3: {
    fontSize: 15,
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
 alignContent:"center",
 alignItems:'center',
    borderColor:'black',
    borderWidth:2,
  
  },


});

export default ListaOrdenes;