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

import { Text } from 'react-native';
export default function Chef({ navigation }) {
  return (
    <Background>
  
      <Header>Chef</Header>
      <Paragraph>Pedidos confirmados</Paragraph>
            <ListaOrdenes nav={navigation}/>
      <Paragraph>{"\n"}Gestionar platos</Paragraph>
            <ListaPlatos nav={navigation}/>
      <Paragraph>{"\n"}Gestionar bebidas</Paragraph>
            <ListaBebidas nav={navigation}/>

    

      <Paragraph>{"\n"}Gestionar ingredientes</Paragraph>
        
<SolicitarIng nav={navigation}/>

<Paragraph>{"\n"}Lista de ingredientes</Paragraph>
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
    </Background>
  );
}
