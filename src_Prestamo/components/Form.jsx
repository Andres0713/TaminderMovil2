import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors'
import { Picker } from '@react-native-picker/picker'

export default function Form(props) {
  const {setCapital,setInteres,setMeses}=props
    const [selectedLanguage, setSelectedLanguage] = useState('');
  return (
    <View style={styles.viewForm}>
      <View style={styles.viewInput}>
        <TextInput 
        style={styles.input} 
        keyboardType='numeric' 
        placeholder='Cantidad a pedir'
        onChange={e=>setCapital(e.nativeEvent.text)}
        ></TextInput>

        <TextInput 
        style={[styles.input, styles.inputPorcentaje]}
         keyboardType='numeric' 
         placeholder='Interés %'
         onChange={e=>setInteres(e.nativeEvent.text)}
         ></TextInput>
      </View>
    <View>
    <Picker
    style={pickerStyles.input}
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>{
    setSelectedLanguage(itemValue)
    setMeses(itemValue)
  }
  }>
  <Picker.Item label="3 meses" value={3} />
  <Picker.Item label="6 meses" value={6} />
  <Picker.Item label="9 meses" value={9} />
  <Picker.Item label="12 meses" value={12} />
  <Picker.Item label="24 meses" value={24} />
</Picker>
    </View>
    <View>
        <Text>Seleccionado:{selectedLanguage}</Text>
    </View>
    </View>
  )
}

const pickerStyles = StyleSheet.create({
    input:{
        backgroundColor: '#fff',
        borderRadius:5,
        borderWidth:3,
        paddingVertical:10
    }
})

const styles = StyleSheet.create({
    viewForm:{

        position: 'absolute',//position: absolute y botton deben ir juntos
        bottom:0, //-10 se va más abajo

        backgroundColor:colors.PRIMARY_COLOR_DARK,
        width: '85%',
        height: 150,
        paddingHorizontal: 50,
        borderRadius:30,
    },
    input:{
        height:50,
        width: '60%',
        backgroundColor:'#fff',
        marginBottom: 5,
        marginTop: 10,
        color:'#000',
        borderWidth: 1,
        borderColor:colors.PRIMARY_COLOR,
        borderRadius: 5,
        marginRight: 10,
        paddingHorizontal:10
    },
    inputPorcentaje:{
        width: '40%',
        marginLeft: 5
    },
    viewInput:{
        flexDirection: 'row'

    }
})