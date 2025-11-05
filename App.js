import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { initDatabase } from "./src/database/database";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const initialize = async () => {
      const ok = await initDatabase();
      setStatus(ok ? "✅ Banco criado com sucesso!" : "❌ Erro ao criar banco");
      setLoading(false);
    };
    initialize();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text>Iniciando banco de dados...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>{status}</Text>
    </View>
  );
}
