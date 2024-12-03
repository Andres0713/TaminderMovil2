import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

export default function AddBirthday() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [formData, setFormData] = useState({})
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        const dataBirth=date
        dataBirth.setHours(0)
        dataBirth.setMinutes(0)
        dataBirth.setSeconds(0)
        setFormData({...formData,dataBirth})
        //console.log(dataBirth)
        console.log(formData)
        console.log(moment(date).format('LL'))
        hideDatePicker();
      };

      const onchange=(e,type)=>{
        setFormData({...formData, [type]:e.nativeEvent.text})
      }
    return (
        <>
            <View>
                <TextInput 
                    placeholder='Nombre'
                    placeholderTextColor='#969696'
                    onChange={e=>onchange(e,'name')}></TextInput>
            </View>
            <View>
                <TextInput placeholder='Apellidos'
                    placeholderTextColor='#969696'
                    onChange={e=>onchange(e,'lastname')}
                    ></TextInput>
            </View>
            <View>
                <Text onPress={showDatePicker} style={{
                    color:formData.dateBirth ? '#00f' : '#969696',
                    fontSize: 18
                }}>
                    {
                        formData.dateBirth ? moment(formData.dateBirth).format('LL') : "Fecha de Nacimiento"
                    }</Text>
            </View>
            <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
        </>
    )
}

const styles = StyleSheet.create({
    textDate:{
        color:'#969696',
        fontSize:18
    }
})