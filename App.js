
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';//entre llaves especificas exactamente qué módulo usarás y no el de por defecto
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from './src/utils/firebase'//se encuentra adentro de firebase
import Auth from './src/components/Auth';
import LoginIndex from './src/components/loginIndex';
import App2 from './src_Prestamo/components/App2';
import ListBirthday from './src/components/ListBirthday';
import Admin from './Admin'

export default function App() {
  const [user, setUser] = useState(undefined)//creamos este


  useEffect(() => {//este código lo sacamos de aquí: https://firebase.google.com/docs/auth/web/start?hl=es
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {//autenticar usuario
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(true)
        // ...
      } else {
        setUser(false)
        console.log('usuario no autenticado', user)
      }
    });
  }, [])

  if (user === undefined) return null




  return (
    <View style={styles.container}>
      {user ? <Admin/> : <Auth />}
    </View>
  );
}

function LogOut() {
  function logOut() {
    //poner el código para poder cerrar sesión
    const auth = getAuth(app);
    signOut(auth).then(() => {
      console.log('Cerró sesión')
    }).catch((error) => {
      //An error happened
    })
  }
  return (
    <View style={styles.container}>
      <Text>Estás logeado. Bienvenido!</Text>
      <App2></App2>
      <Button title='Cerrar sesión' onPress={logOut}></Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff'
  },
});
