import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Form from './Form';
import Footer from './Footer';
import colors from '../utils/colors'
import { useState } from 'react';
import React, { useEffect } from 'react'
import ResultCalculation from './ResultCalculation';

export default function App2() {
  const [capital, setCapital] = useState(null)
  const [interes, setInteres] = useState(null)
  const [meses, setMeses] = useState(null)
  const [total, setTotal] = useState(null)//objeto de las 2 variables que necesito
  const [errorMessage, setErrorMessage] = useState('')

  const calcular = () => {
    setTotal(null)
    setErrorMessage('')
    if (!capital) {
      setErrorMessage('Falta el Capital')
    } else if (!interes) {
      setErrorMessage('Falta el interés')
    } else if (!meses) {
      setErrorMessage('Falta elegir los meses')
    } else {
      //console.log(capital, interes, meses)
      const i = interes / 100
      const fee = capital / ((1 - Math.pow(1 + i, -meses)) / i)
      setTotal({
        monthlyFee: fee.toFixed(2),
        totalPayable: (fee * meses).toFixed(2)
      })
      console.log(total)
    }
    //console.log(capital, interes, meses)
  }

  useEffect(() => {
    //qué va a hacer cuando cambie las dependencias
    calcular()
    return () => {

    }
  }, [capital, interes, meses])//cuando hay un cambio va a cambiar esto
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Cotizador</Text>
        <Form
          setCapital={setCapital}
          setInteres={setInteres}
          setMeses={setMeses}
        ></Form>
      </View>
      <ResultCalculation 
        capital={capital}
        interes={interes}
        meses={meses}
        total={total}
        errorMessage={errorMessage}
      ></ResultCalculation>
      <Footer calcular={calcular}></Footer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRigthRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  }
});
