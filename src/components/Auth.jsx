import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(false)

    const changeForm=()=>{
        setIsLogin(!isLogin)
    }
  return (
    <View style={styles.view}>
        <Image style={styles.logo} source={require('../../assets/icon.png')}/>
      {
        isLogin ? <LoginForm changeForm={changeForm}/> : <RegisterForm changeForm={changeForm}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    logo:{
        width:'80%',
        height: 250,
        marginTop: 50,
        marginBottom: 50
    },
    view:{
        flex:1,
        alignItems:'center'
    }
})