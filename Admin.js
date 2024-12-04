import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AltasForm from "./src3/components/AltasForm";
import ReportesList from "./src3/components/ReportesList";
import db from './src/utils/firebase'

const Tab = createBottomTabNavigator();

function logOut() {
  // Implementación de logout, por ejemplo:
  Alert.alert(
    "Cerrar sesión",
    "¿Estás seguro de que deseas cerrar sesión?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        onPress: () => {
          function logOut() {
            //poner el código para poder cerrar sesión
            const auth = getAuth(db);
            signOut(auth).then(() => {
              console.log('Cerró sesión')
            }).catch((error) => {
              //An error happened
            })
          }
        },
      },
    ],
    { cancelable: true }
  );
}

function AltasScreen() {
  return (
    <View style={styles.screen}>
      <AltasForm />
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function BajasScreen() {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function ModificacionesScreen() {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function ReportesScreen() {
  return (
    <View style={styles.screen}>
      <ReportesList />
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Altas") {
              iconName = focused ? "person-add" : "person-add-outline";
            } else if (route.name === "Bajas") {
              iconName = focused ? "trash" : "trash-outline";
            } else if (route.name === "Modificaciones") {
              iconName = focused ? "create" : "create-outline";
            } else if (route.name === "Reportes") {
              iconName = focused ? "bar-chart" : "bar-chart-outline";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Altas" component={AltasScreen} />
        <Tab.Screen name="Bajas" component={BajasScreen} />
        <Tab.Screen name="Modificaciones" component={ModificacionesScreen} />
        <Tab.Screen name="Reportes" component={ReportesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  title: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
