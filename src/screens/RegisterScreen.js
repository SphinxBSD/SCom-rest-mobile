import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { namesValidator } from "../helpers/namesValidator";
import { lastnameValidator } from "../helpers/lastnameValidator";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [names, setNames] = useState({ value: "", error: "" });
  const [lastname, setLastname] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [pwdConfirm, setPwdConfirm] = useState({ value: "", error: "" });

  console.log(password);
  console.log(pwdConfirm);
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const namesError = namesValidator(names.value);
    const lastnameError = lastnameValidator(lastname.value);

    let arrApellidos = lastname.value.split(" ");
    console.log(arrApellidos);

    const reqRegisInfo = {
      name: names.value,
      fatherLastname: arrApellidos[0],
      email: email.value,
      motherLastname: arrApellidos[1],
      password: pwdConfirm.value,
      username: name.value,
    };

    if (
      emailError ||
      passwordError ||
      nameError ||
      namesError ||
      lastnameError
    ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setNames({ ...names, error: namesError });
      setLastname({ ...lastname, error: lastnameError });
      return;
    }

    if (password.value === pwdConfirm.value) {
      fetch("http://localhost:" + "8080" + "/api/customers", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(reqRegisInfo),
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } else window.alert("Revise su contraseña!");
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Crear una cuenta</Header>
      <TextInput
        label="Nombre de usuario"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Nombres"
        returnKeyType="next"
        value={names.value}
        onChangeText={(text) => setNames({ value: text, error: "" })}
        error={!!names.error}
        errorText={names.error}
      />
      <TextInput
        label="Apellidos"
        returnKeyType="next"
        value={lastname.value}
        onChangeText={(text) => setLastname({ value: text, error: "" })}
        error={!!lastname.error}
        errorText={lastname.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirmar contraseña"
        returnKeyType="done"
        value={pwdConfirm.value}
        onChangeText={(text) => setPwdConfirm({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registrarme
      </Button>
      <View style={styles.row}>
        <Text>¿Ya consta de una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Iniciar sesion</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
