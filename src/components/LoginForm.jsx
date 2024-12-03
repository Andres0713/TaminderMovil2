import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { validateEmail } from '../utils/validation';
import app from '../utils/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginForm({ changeForm }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Inicio de sesión exitoso', `Bienvenido, ${user.email}`);
        })
        .catch((error) => {
          Alert.alert(
            'Error al iniciar sesión',
            'Correo o contraseña incorrectos'
          );
        });
    }
    setFormErrors(errors);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡¡Bienvenido!!</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#B0BEC5"
        style={[styles.input, formErrors.email && styles.error]}
        onChange={(e) =>
          setFormData({ ...formData, email: e.nativeEvent.text })
        }
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#B0BEC5"
        secureTextEntry
        style={[styles.input, formErrors.password && styles.error]}
        onChange={(e) =>
          setFormData({ ...formData, password: e.nativeEvent.text })
        }
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fondo claro
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30, // Sin margen lateral
    width: '100%', // Abarca todo el ancho del dispositivo
    borderRadius:60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0', // Azul principal
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#607D8B', // Gris claro
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%', // Abarca todo el ancho del contenedor
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderColor: '#E0E0E0', // Gris suave
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#424242', // Texto oscuro
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1565C0', // Azul principal
    paddingVertical: 15,
    width: '100%', // Abarca todo el ancho del contenedor
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', // Texto blanco
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 10,
  },
  registerText: {
    fontSize: 16,
    color: '#1565C0', // Azul principal
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  error: {
    borderColor: '#D32F2F', // Rojo para errores
  },
});
