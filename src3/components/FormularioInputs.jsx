import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

const FormularioInputs = ({ formData, onInputChange, onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formData.name}
        onChangeText={(text) => onInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={formData.age}
        keyboardType="numeric" // Asegura que solo se ingresen números
        onChangeText={(text) => onInputChange("age", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Horas Trabajadas"
        value={formData.hoursWorked}
        keyboardType="numeric" // Asegura que solo se ingresen números
        onChangeText={(text) => onInputChange("hoursWorked", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pago por Día"
        value={formData.dailyPay}
        keyboardType="numeric" // Asegura que solo se ingresen números
        onChangeText={(text) => onInputChange("dailyPay", text)}
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Agregar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FormularioInputs;
