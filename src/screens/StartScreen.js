import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'


export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Restaurant Cuisine </Header>
      <Paragraph>Bienvenido a la pagina de inicio de sesion.</Paragraph>
      
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Iniciar sesion
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Registrarme
      </Button>
    </Background>
  )
}
