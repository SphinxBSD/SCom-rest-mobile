import React, { useState } from "react";
import Background from "../components/Background";
import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import Logo from "../components/Logo";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import HeaderIni from "../components/HeaderIni";
import NavigatorCart from "../components/NavigatorCart";

export default function Dashboard({ navigation }) {
  const [ped, setPed] = useState([]);
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
        ped={ped}
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
