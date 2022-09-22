import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onLoginPressed = async () => {
    const passwordError = passwordValidator(password.value);
    const nameError = nameValidator(name.value);

    if (nameError || passwordError) {
      setName({ ...name, error: nameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const reqBody = {
      password: password.value,
      usernameOrEmail: name.value,
    };
    const resp = await fetch("http://localhost:" + "8080" + "/api/auth/login", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(reqBody),
    }).catch((error) => {
      console.log(error);
    });
    const salida = await resp.json();
    const exito = salida.success;
    console.log(salida);

    if (exito === true) {
      /*const dataLog = salida.data;
      localStorage.setItem("role", dataLog.role);
      localStorage.setItem("id", dataLog.id);
      localStorage.setItem("username", name.value)*/
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } else window.alert("El usuario no se encuentra registrado!");
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Bienvenido de vuelta!</Header>
      <TextInput
        label="Nombre o email de usuario"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="constraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={onLoginPressed}>
        Iniciar sesion
      </Button>
      <View style={styles.row}>
        <Text>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Registrarme</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
