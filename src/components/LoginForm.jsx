import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { validateEmail } from '../utils/validation'
import app from '../utils/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm({ changeForm }) {


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: ''
  })

  const [formErrors, setFormErrors] = useState({})

  const login = () => {
    //console.log('Registrando...')
    let errors = {}//Verificar los errores
    if (!formData.email || !formData.password) {//si está vacío
      console.log('Algún campo está vacío')
      if (!formData.email) errors.email = true
      if (!formData.password) errors.password = true
    } else if (!validateEmail(formData.email)) {//Si no tiene el formato de un correo
      errors.email = true
    }
    else {
      console.log(formData)
      //pegar de la página de firebase "Registrar nuevos usuarios": https://firebase.google.com/docs/auth/web/start?hl=es-419
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user.email)
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
      <Text>Login form</Text>
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

      <View style={styles.register}>
        <TouchableOpacity style={styles.btnText}>
          <Button title='Iniciar sesión' onPress={login}></Button>
        </TouchableOpacity>
        
      </View>
      <Button title='Registro' onPress={changeForm} ></Button>

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