import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Button,
} from "react-native";
import { db } from "../../src/utils/firebase";
import { doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";

export default function Bajas() {
    const [users, setUsers] = useState([]);

    // Escucha los datos de la colección y filtra por estado "Inactivo"
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
            const data = querySnapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter((user) => user.estado === "Inactivo"); // Filtrar usuarios inactivos
            setUsers(data);
        });

        return () => unsubscribe();
    }, []);


    const eliminar = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            Alert.alert("Usuario eliminado", "El usuario ha sido eliminado permanentemente.");
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el usuario.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usuarios Inactivos</Text>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.item}>
                            <Text style={styles.detail}>Nombre: {item.nombre}</Text>
                            <Text style={styles.detail}>Apellido Paterno: {item.apellido_paterno}</Text>
                            <Text style={styles.detail}>Apellido Materno: {item.apellido_materno}</Text>
                            <Text style={styles.detail}>Rol: {item.rol}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => eliminar(item.id)} // Llama a la función de eliminación
                        >
                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    itemContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 8,
    },
    item: {
        flex: 1,
    },
    detail: {
        fontSize: 16,
        color: "#555",
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
