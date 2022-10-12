import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import HeaderIni from "../components/HeaderIni";
import FoodCart from "../components/FoodCart";
import DrinkCart from "../components/DrinkCart";

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <HeaderIni />
      <Logo />
      <Paragraph>Bienvenido al menu de la pagina</Paragraph>
      <DrinkCart />
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
