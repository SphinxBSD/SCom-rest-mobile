import React from "react";
import Background from "../components/Background";
//import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import Button2 from "../components/chef/Botonnn";
import ListaOrdenes from "../components/chef/ListaOrdenes";
import ListaPlatos from "../components/chef/ListaPlatos";
import ListaBebidas from "../components/chef/ListaBebidas";
import SolicitarIng from "../components/chef/SolicitarIng";
import ListaIngredientes from "../components/chef/ListaIngredientes";

import { Text, ScrollView,SafeAreaView,StyleSheet } from 'react-native';
export default function Chef({ navigation }) {
  return (
< Background >
    < SafeAreaView >
    <ScrollView >
    <Text>{"\n"}</Text>
      <Header style={styles.hed}>Chef</Header>
      <Paragraph style={styles.hed2}>Pedidos confirmados</Paragraph>
            <ListaOrdenes nav={navigation}/>
                  <Text>{"\n"}</Text>
                 
      <Paragraph style={styles.hed2}>{"\n"}Gestionar platos</Paragraph>
            <ListaPlatos nav={navigation}/>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text></Text>
      <Paragraph style={styles.hed2}>{"\n"}Gestionar bebidas</Paragraph>
            <ListaBebidas nav={navigation}/>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
      <Paragraph style={styles.hed2}>{"\n"}Gestionar ingredientes</Paragraph>
        
<SolicitarIng nav={navigation}/>

<Paragraph style={styles.hed2}>{"\n"}Lista de ingredientes</Paragraph>
            <ListaIngredientes nav={navigation}/>

      <Text>{"\n"}</Text>
      

      
            <Button2
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Chef" }],
          })
        }
        title="Actualizar"
      />


   


      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
      >
        Logout
      </Button>
    </ScrollView >
    </SafeAreaView>
    </Background>

  );
}


const styles = StyleSheet.create({
  hed: {
    textAlign:"center",
    fontSize:30,

    
  },
  hed2: {
    textAlign:"center",
    fontSize:25,

    boxShadow:5,
  },
 

});