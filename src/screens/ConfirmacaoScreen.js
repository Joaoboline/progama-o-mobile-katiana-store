import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmacaoScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Tabs", { screen: "Perfil" });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/845/845646.png" }}
        style={styles.icone}
      />
      <Text style={styles.titulo}>Pedido Confirmado! 🎉</Text>
      <Text style={styles.subtitulo}>
        Obrigado por comprar na Katiana Store 💖
      </Text>
      <Text style={styles.mensagem}>
        Seu pedido foi registrado e está disponível em “Meus Pedidos”.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icone: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#E63946",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  mensagem: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
});
