import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ produto }) {
  const { adicionarAoCarrinho } = useContext(CartContext);

  return (
    <TouchableOpacity style={styles.card} onPress={() => adicionarAoCarrinho(produto)}>
      <Image source={{ uri: produto.imagem }} style={styles.image} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>{produto.preco}</Text>
      <Text style={styles.botao}>+ Adicionar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 150,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  nome: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  preco: {
    color: "#00a86b",
    fontSize: 14,
    marginTop: 5,
  },
  botao: {
    marginTop: 8,
    color: "#007AFF",
    fontWeight: "bold",
  },
});
