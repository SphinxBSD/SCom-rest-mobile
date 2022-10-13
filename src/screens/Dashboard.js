import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import HeaderIni from "../components/HeaderIni";
import NavigatorCart from "../components/NavigatorCart";
import RequestStock from "../components/RequestStock";

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <HeaderIni />
      <Logo />
      <Paragraph>Bienvenido al menu de la pagina</Paragraph>

      <NavigatorCart />

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
