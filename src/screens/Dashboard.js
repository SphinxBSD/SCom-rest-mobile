import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import HeaderIni from "../components/HeaderIni";
import NavigatorCart from "../components/NavigatorCart";
import Pedidos from "../components/Pedidos";

export default function Dashboard({ navigation }) {
  const [comida, setComidas] = useState([]);
  const [bebida, setBebidas] = useState([]);

  return (
    <Background>
      <HeaderIni />
      <Logo />
      <Paragraph>Bienvenido al menu de la pagina</Paragraph>
      <NavigatorCart
        comida={comida}
        setComidas={setComidas}
        bebida={bebida}
        setBebidas={setBebidas}
      />
      <Pedidos />
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
