import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import ListaPlatos from "../components/chef/ListaPlatos";

export default function Chef({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Pagina Chef</Header>
      <Paragraph>Bienvenido al menu de la pagina</Paragraph>
      <ListaPlatos/>
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
