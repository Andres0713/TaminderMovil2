import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { db } from "../../src/utils/firebase";
import { doc, collection, onSnapshot, deleteDoc, setDoc } from "firebase/firestore";

const ReportesList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para mostrar detalles
  const [modalVisible, setModalVisible] = useState(false); // Controla la visibilidad del modal
  const [isEditing, setIsEditing] = useState(false); // Controla el estado de edición
  const [editUser, setEditUser] = useState(null); // Datos del usuario a editar

  // Escucha de cambios en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    });

    // Limpia el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Maneja la selección de un usuario
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  // Maneja la edición de un usuario
  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditing(true);
  };

  // Guarda los cambios del usuario editado
  const handleSaveUser = async () => {
    if (editUser) {
      try {
        await setDoc(doc(db, "users", editUser.id), {
          name: editUser.name,
          age: editUser.age,
          hoursWorked: editUser.hoursWorked || 0,
          dailyPay: editUser.dailyPay || 0,
        });
        Alert.alert("Usuario actualizado", "La información del usuario ha sido actualizada.");
        setIsEditing(false);
        setEditUser(null);
      } catch (error) {
        Alert.alert("Error", "No se pudo guardar la información.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Reportes</Text>

      {/* Lista de usuarios */}
      <FlatList
  data={users}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleSelectUser(item)} // Selección del usuario al hacer clic
      >
        <Text style={styles.name}>Usuario: {item.usuario}</Text>
        <Text style={styles.detail}>Nombre: {item.nombre}</Text>
        <Text style={styles.detail}>Apellido Paterno: {item.apellido_paterno}</Text>
        <Text style={styles.detail}>Apellido Materno: {item.apellido_materno}</Text>
        <Text style={styles.detail}>Correo: {item.correo}</Text>
        <Text style={styles.detail}>Rol: {item.rol}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {/* Botón para eliminar */}
        <Button
          title="Eliminar"
          onPress={() => eliminar(item.id)}
          color="red"
        />
        {/* Botón para editar */}
        <Button
          title="Editar"
          onPress={() => handleEditUser(item)}
          color="blue"
        />
      </View>
    </View>
  )}
  initialNumToRender={10} // Renderiza inicialmente 10 elementos
  removeClippedSubviews={true} // Mejora el rendimiento
/>


      {/* Modal para mostrar detalles */}
      {selectedUser && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del Usuario</Text>
              <Text style={styles.modalText}>Nombre: {selectedUser.name}</Text>
              <Text style={styles.modalText}>Edad: {selectedUser.age}</Text>
              <Text style={styles.modalText}>
                Horas Trabajadas: {selectedUser.hoursWorked}
              </Text>
              <Text style={styles.modalText}>
                Pago por Día: {selectedUser.dailyPay}
              </Text>
              <Text style={styles.modalText}>
                Pago Total: {selectedUser.hoursWorked * selectedUser.dailyPay}
              </Text>
              <Button title="Cerrar" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para editar usuario */}
      {isEditing && (
        <Modal
          visible={isEditing}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsEditing(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Usuario</Text>
              <TextInput
                style={styles.input}
                value={editUser?.name}
                onChangeText={(text) => setEditUser({ ...editUser, name: text })}
                placeholder="Nombre"
              />
              <TextInput
                style={styles.input}
                value={String(editUser?.age)}
                onChangeText={(text) => setEditUser({ ...editUser, age: Number(text) })}
                placeholder="Edad"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={String(editUser?.hoursWorked || 0)}
                onChangeText={(text) => setEditUser({ ...editUser, hoursWorked: Number(text) })}
                placeholder="Horas Trabajadas"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={String(editUser?.dailyPay || 0)}
                onChangeText={(text) => setEditUser({ ...editUser, dailyPay: Number(text) })}
                placeholder="Pago por Día"
                keyboardType="numeric"
              />
              <Button title="Guardar" onPress={handleSaveUser} />
              <Button title="Cancelar" onPress={() => setIsEditing(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const eliminar = (id) => {
  deleteDoc(doc(db, "users", id));
};

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  item: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 16,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
});

export default ReportesList;
