import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "../components/BackButton";
import IconIni from "../components/IconIni";

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <BackButton />
      <IconIni />
      <Logo />

      <Header>Menu</Header>
      <ScrollView>
        <Paragraph>Bienvenido al menu de la pagina</Paragraph>
      </ScrollView>
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
