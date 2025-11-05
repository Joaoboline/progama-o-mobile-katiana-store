import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProductCard({ produto, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: produto.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>

      <TouchableOpacity style={styles.botao} onPress={() => onAdd(produto)}>
        <Text style={styles.textoBotao}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    margin: 8,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  nome: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  preco: {
    fontSize: 14,
    color: "#FF6347",
    marginVertical: 5,
  },
  botao: {
    backgroundColor: "#FF6347",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "600",
  },
});
