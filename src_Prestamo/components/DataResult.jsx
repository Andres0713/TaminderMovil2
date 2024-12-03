import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DataResult({ titulo, value }) {
    return (
        <View style={styles.filaTabla}>
            <Text style={styles.tituloCelda}>{titulo}</Text>
            <Text style={styles.valorCelda}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    filaTabla: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 2,
        borderBottomColor: '#333',
    },
    tituloCelda: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
    valorCelda: {
        fontSize: 16,
        color: '#555',
    },
})