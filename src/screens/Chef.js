import React from "react";
import Background from "../components/Background";
//import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import ListaOrdenes from "../components/chef/ListaOrdenes";
import ListaPlatos from "../components/chef/ListaPlatos";
import ListaBebidas from "../components/chef/ListaBebidas";

export default function Chef({ navigation }) {
  return (
    <Background>
  
      <Header>Chef</Header>
      <Paragraph>Pedidos facturados</Paragraph>
            <ListaOrdenes/>
      <Paragraph>Gestionar platos</Paragraph>
            <ListaPlatos/>
      <Paragraph>Gestionar bebidas</Paragraph>
            <ListaBebidas/>
      
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
