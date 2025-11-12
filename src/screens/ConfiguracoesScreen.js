import React, { useState, useContext } from "react";
import { View,Text,TouchableOpacity,StyleSheet,Switch,Alert, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";

export default function ConfiguracoesScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();
  const { clearCart } = useContext(CartContext);

  const toggleTheme = async () => {
    try {
      const newMode = !darkMode;
      setDarkMode(newMode);
      await AsyncStorage.setItem("theme", newMode ? "dark" : "light");
      Alert.alert(
        "Tema alterado",
        `Modo ${newMode ? "Escuro" : "Claro"} ativado com sucesso!`
      );
    } catch (error) {
      console.error("Erro ao salvar tema:", error);
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      "Limpar carrinho",
      "Tem certeza que deseja esvaziar o carrinho?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: () => {
            clearCart();
            Alert.alert("Carrinho limpo!", "Todos os itens foram removidos.");
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            navigation.navigate("Tabs", { screen: "Loja" });
            Alert.alert("Logout realizado", "Você saiu da conta com sucesso!");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Configurações</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Tema Escuro</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleClearCart}>
        <Text style={styles.buttonText}>🧺 Limpar Carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Alert.alert(
            "Sobre o App",
            "🛒 Katiana Store\nVersão 1.0.0\nDesenvolvido com React Native e Expo."
          )
        }
      >
        <Text style={styles.buttonText}>ℹ️ Sobre o App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#555" }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>🚪 Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#E63946",
    textAlign: "center",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#E63946",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
