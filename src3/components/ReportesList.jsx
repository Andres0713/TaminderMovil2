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
import { Picker } from '@react-native-picker/picker';

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

  // Abre el modal de edición
  const handleEditUser = () => {
    setEditUser(selectedUser);
    setIsEditing(true);
    setModalVisible(false); // Cierra el modal de detalles
  };

  // Guarda los cambios del usuario editado
  const handleSaveUser = async () => {
    if (editUser) {
      try {
        await setDoc(doc(db, "users", editUser.id), editUser);
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
        data={users.filter((user) => user.estado === "Activo")} // Filtra usuarios activos
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectUser(item)} // Selección del usuario al hacer clic
            >
              <Text style={styles.detail}>Nombre: {item.nombre}</Text>
              <Text style={styles.detail}>Apellido Paterno: {item.apellido_paterno}</Text>
              <Text style={styles.detail}>Apellido Materno: {item.apellido_materno}</Text>
              <Text style={styles.detail}>Rol: {item.rol}</Text>
            </TouchableOpacity>
          </View>
        )}
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
              <Text style={styles.modalText}>Nombre: {selectedUser.nombre}</Text>
              <Text style={styles.modalText}>Apellido Paterno: {selectedUser.apellido_paterno}</Text>
              <Text style={styles.modalText}>Apellido Materno: {selectedUser.apellido_materno}</Text>
              <Text style={styles.modalText}>Rol: {selectedUser.rol}</Text>
              <Text style={styles.modalText}>Estado: {selectedUser.estado}</Text>
              <Button title="Cerrar" onPress={closeModal} />
              <Button title="Modificar" onPress={handleEditUser} />
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
                value={editUser?.nombre}
                onChangeText={(text) => setEditUser({ ...editUser, nombre: text })}
                placeholder="Nombre"
              />
              <TextInput
                style={styles.input}
                value={editUser?.apellido_paterno}
                onChangeText={(text) =>
                  setEditUser({ ...editUser, apellido_paterno: text })
                }
                placeholder="Apellido Paterno"
              />
              <TextInput
                style={styles.input}
                value={editUser?.apellido_materno}
                onChangeText={(text) =>
                  setEditUser({ ...editUser, apellido_materno: text })
                }
                placeholder="Apellido Materno"
              />
              {/* Selector para Rol */}
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Rol:</Text>
                <Picker
                  selectedValue={editUser?.rol}
                  onValueChange={(itemValue) =>
                    setEditUser({ ...editUser, rol: itemValue })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona un rol" value="" />
                  <Picker.Item label="Administrador" value="Administrador" />
                  <Picker.Item label="Gerente" value="Gerente" />
                  <Picker.Item label="Staff" value="Staff" />
                </Picker>
              </View>

              {/* Selector para Estado */}
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Estado:</Text>
                <Picker
                  selectedValue={editUser?.estado}
                  onValueChange={(itemValue) =>
                    setEditUser({ ...editUser, estado: itemValue })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona un estado" value="" />
                  <Picker.Item label="Activo" value="Activo" />
                  <Picker.Item label="Inactivo" value="Inactivo" />
                </Picker>
              </View>
              <Button title="Guardar" onPress={handleSaveUser} />
              <Button title="Cancelar" onPress={() => setIsEditing(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
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
  pickerContainer: {
    width: "80%",
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  picker: {
    width: "100%",
    height: "100%",
  },
});

export default ReportesList;
