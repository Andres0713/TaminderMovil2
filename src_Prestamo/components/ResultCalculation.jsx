import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DataResult from './DataResult';
export default function ResultCalculation(props) {
    const { capital, interes, meses, total, errorMessage } = props;

    return (
        <View style={styles.contenido}>
            {total && (
                <View style={styles.cajaResultado}>
                    <Text style={styles.textoEncabezado}>RESULTADO TOTAL</Text>
                    <View style={styles.tabla}>
                        <DataResult titulo='Cantidad solicitada: ' value={`$${capital}`} />
                        <DataResult titulo='Interes %: ' value={`${interes}%`} />
                        <DataResult titulo='Plazos: ' value={`${meses} meses`} />
                        <DataResult titulo='Pago mensual: ' value={`$${total.monthlyFee} al mes`} />
                        <DataResult titulo='Total a pagar: ' value={`${total.totalPayable}`} />
                    </View>
                </View>
            )}
            <View>
                <Text style={styles.error}>
                    {errorMessage}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textoEncabezado: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
    },
    contenido: {
        marginHorizontal: 20,
        zIndex: 1
    },
    cajaResultado: {
        padding: 20,
        backgroundColor: 'gray',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    tabla: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 8,
        overflow: 'hidden',
    },
    error: {
        color: '#f00',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
});
