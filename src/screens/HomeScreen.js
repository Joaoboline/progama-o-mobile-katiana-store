import React from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const produtos = [
  {
    id: 1,
    nome: "Conjunto de Panelas Inox",
    preco: 249.9,
    imagem: "https://images.unsplash.com/photo-1616628188466-bb219a03e8e3?w=600",
  },
  {
    id: 2,
    nome: "Jogo de Copos de Vidro",
    preco: 79.9,
    imagem: "https://images.unsplash.com/photo-1606813902771-d9f3b6a0bfc3?w=600",
  },
  {
    id: 3,
    nome: "Conjunto de Pratos Cerâmicos",
    preco: 99.9,
    imagem: "https://images.unsplash.com/photo-1565958011702-44e211b7e8b3?w=600",
  },
  {
    id: 4,
    nome: "Faqueiro Inox 24 Peças",
    preco: 149.9,
    imagem: "https://images.unsplash.com/photo-1606313564200-9b69d42d0e58?w=600",
  },
];

export default function HomeScreen() {
  const { addToCart } = useCart();

  const handleAdd = (produto) => {
    addToCart(produto);
    Alert.alert("Produto adicionado!", `${produto.nome} foi adicionado ao carrinho.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛍️ Katiana Store</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard produto={item} onAdd={handleAdd} />
        )}
        numColumns={2}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FF6347",
  },
  lista: {
    paddingHorizontal: 10,
  },
});
