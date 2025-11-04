import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CarrinhoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🛒 Seu carrinho está vazio.</Text>
      <Text style={styles.subtext}>Adicione produtos na aba Home!</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6347",
  },
  subtext: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});
