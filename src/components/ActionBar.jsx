import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import app from '../utils/firebase'//se encuentra adentro de firebase

export default function ActionBar({ showList, setShowList }) {
    //Función para cerrar sesión cuando de clic en el botón correspondiente
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
        <View style={styles.viewFooter}>
            <View style={styles.viewClose}>
                <Text style={styles.text}
                    onPress={logOut}>Cerrar sesión</Text>
            </View>
            <View style={styles.viewDate}>
                <Text style={styles.text}
                    onPress={() => setShowList(!showList)}>
                    {
                        showList ? 'Nueva fecha' : 'Cancelar fecha'
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 30
    },
    viewClose: {
        backgroundColor: '#820000',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    },
    viewDate: {
        backgroundColor: '#1EA1F1',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    }
})