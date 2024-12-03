import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FormularioInputs from "./FormularioInputs"; // Importa el componente de los inputs
import { db } from "../../src/utils/firebase";
import { collection, addDoc } from "firebase/firestore";

const AltasForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    hoursWorked: "",
    dailyPay: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAdd = async () => {
    const { name, age, hoursWorked, dailyPay } = formData;

    // Validación de campos
    if (name && age && hoursWorked && dailyPay) {
      try {
        console.log("Enviando datos a Firestore:", formData); // Para depuración
        await addDoc(collection(db, "users"), {
          name,
          age: parseInt(age), // Convertimos a número
          hoursWorked: parseInt(hoursWorked), // Convertimos a número
          dailyPay: parseFloat(dailyPay), // Convertimos a número con decimales
        });
        alert("Usuario agregado con éxito");
        // Limpia el formulario
        setFormData({
          name: "",
          age: "",
          hoursWorked: "",
          dailyPay: "",
        });
      } catch (error) {
        console.error("Error al guardar en Firestore:", error);
        alert("Error al agregar el usuario: " + error.message);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Altas</Text>
      <FormularioInputs
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default AltasForm;
