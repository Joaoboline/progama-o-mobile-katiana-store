import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }}
        style={styles.avatar}
      />
      <Text style={styles.nome}>João Pedro</Text>
      <Text style={styles.email}>joao@katianastore.com</Text>
      <Text style={styles.info}>Bem-vindo à Katiana Store!</Text>
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#FF6347",
  },
});
