//rnfs
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../utils/colors'

export default function Footer({calcular}) {
    return (
        <View style={styles.viewFooter}>
            <TouchableOpacity style={styles.button}
            onPress={calcular}>
                <Text style={styles.text}>CALCULAR</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        bottom:0,
        width: '100%',
        backgroundColor:colors.PRIMARY_COLOR,
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    button:{
        backgroundColor:colors.PRIMARY_COLOR_DARK,
        width:'80%',
        padding:15,
        borderRadius:20,
        
    }
})