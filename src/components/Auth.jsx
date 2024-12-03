import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo2.png')} />
      {isLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} />}
      <TouchableOpacity onPress={changeForm} style={styles.toggleButton}>
        <Text style={styles.toggleText}>
          {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '60%', // Tamaño más reducido para mejor proporción
    height: 150,
    resizeMode: 'contain',
    marginBottom: 40, // Más espacio debajo de la imagen
  },
  toggleButton: {
    marginTop: 20,
    padding: 10,
  },
  toggleText: {
    fontSize: 16,
    color: '#4285F4', // Color azul tipo Google
    textAlign: 'center',
    fontWeight: '500',
  },
});
