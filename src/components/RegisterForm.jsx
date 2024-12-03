import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { validateEmail } from '../utils/validation'
import app from '../utils/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterForm({ changeForm }) {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: ''
  })

  const [formErrors, setFormErrors] = useState({})

  const register = () => {
    //console.log('Registrando...')
    let errors = {}//Verificar los errores
    if (!formData.email || !formData.password || !formData.repeatPassword) {//si está vacío
      console.log('Algún campo está vacío')
      if (!formData.email) errors.email = true
      if (!formData.password) errors.password = true
      if (!formData.repeatPassword) errors.repeatPassword = true
    } else if (!validateEmail(formData.email)) {//Si no tiene el formato de un correo
      errors.email = true
    } else if (formData.password !== formData.repeatPassword) {//Si las contraseñas no coinciden
      errors.password = true
      errors.repeatPassword = true
    } else if (formData.password.length < 6) {//Si la contraseña es menor de 6 caracteres
      errors.password = true
    }
    else {
      console.log(formData)
      //pegar de la página de firebase "Registrar nuevos usuarios": https://firebase.google.com/docs/auth/web/start?hl=es-419
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    }
    setFormErrors(errors)
    //console.log(errors)
  }
  return (
    <>
      <Text>RegisterForm</Text>
      <TextInput
        placeholder='Dame el correo electrónico'
        placeholderTextColor='white'
        style={[styles.input, formErrors.email && styles.error]}
        onChange={e => setFormData({ ...formData, email: e.nativeEvent.text })}></TextInput>
      {//console.log(e.nativeEvent.text)
      }
      <TextInput
        placeholder='Contraseña'
        placeholderTextColor='white'
        secureTextEntry
        style={[styles.input, formErrors.password && styles.error]}
        onChange={e => setFormData({ ...formData, password: e.nativeEvent.text })}
      ></TextInput>

      <TextInput
        placeholder='Repetir la contraseña'
        placeholderTextColor='white'
        secureTextEntry
        onChange={e => setFormData({ ...formData, repeatPassword: e.nativeEvent.text })}
        style={[styles.input, formErrors.repeatPassword && styles.error]}></TextInput>

      <View style={styles.register}>
        <TouchableOpacity style={styles.btnText}>
          <Button title='Regístrate' onPress={register}></Button>
        </TouchableOpacity>
      </View>

      <Button title='Iniciar sesión' onPress={changeForm}></Button>
    </>
  )
}

const styles = StyleSheet.create({
  btnText: {
    width: '100%',
    color: '#000',
    backgroundColor: 'white',
    fontSize: 20,
    marginBottom: 10
  },
  input: {
    height: 50,
    width: '80%',
    color: 'white',
    width: '80%',
    backgroundColor: '#1E3040',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  register: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  error: {
    borderColor: '#F00',
    borderWidth: 4
  }
})