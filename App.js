import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { initDatabase } from "./src/database/database";

export default function App() {
  const [status, setStatus] = useState("Inicializando...");

  useEffect(() => {
    const initDB = async () => {
      try {
        await initDatabase();
        setStatus("✅ Banco criado com sucesso!");
      } catch (error) {
        console.error(error);
        setStatus("❌ Erro ao criar o banco de dados");
      }
    };

    initDB();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
      <ActivityIndicator size="large" color="#FF6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
