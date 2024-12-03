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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterForm({ changeForm }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password !== formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
    } else {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert(
            'Registro exitoso',
            `Bienvenido, ${user.email}`
          );
        })
        .catch((error) => {
          Alert.alert(
            'Error al registrar',
            'Ocurrió un problema al crear tu cuenta'
          );
        });
    }
    setFormErrors(errors);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>Regístrate para continuar</Text>

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

      <TextInput
        placeholder="Repetir contraseña"
        placeholderTextColor="#B0BEC5"
        secureTextEntry
        style={[styles.input, formErrors.repeatPassword && styles.error]}
        onChange={(e) =>
          setFormData({ ...formData, repeatPassword: e.nativeEvent.text })
        }
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Regístrate</Text>
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
  loginLink: {
    marginTop: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#1565C0', // Azul principal
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  error: {
    borderColor: '#D32F2F', // Rojo para errores
  },
});
