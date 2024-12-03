import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { db } from "../../src/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const ReportesList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para mostrar detalles
  const [modalVisible, setModalVisible] = useState(false); // Controla la visibilidad del modal

  // Fetch de datos desde Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    };
    fetchData();
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Reportes</Text>

      {/* Lista de usuarios */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelectUser(item)} // Selección del usuario al hacer clic
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>Edad: {item.age}</Text>
          </TouchableOpacity>
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
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ReportesList;
