import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import CarrinhoScreen from "../screens/CarrinhoScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ConfiguracoesScreen from "../screens/ConfiguracoesScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#E63946",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Loja") iconName = "home-outline";
          else if (route.name === "Carrinho") iconName = "cart-outline";
          else if (route.name === "Perfil") iconName = "person-outline";
          else if (route.name === "Configurações") iconName = "settings-outline";
          return (
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={24} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Loja" component={HomeScreen} />
      <Tab.Screen name="Carrinho" component={CarrinhoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Configurações" component={ConfiguracoesScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  label: { fontSize: 12, fontWeight: "600" },
  iconContainer: { alignItems: "center", justifyContent: "center" },
});
