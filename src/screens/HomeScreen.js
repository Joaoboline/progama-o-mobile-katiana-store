import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const produtos = [
  {
    id: 1,
    nome: "Conjunto de Panelas",
    preco: "R$ 249,90",
    imagem: "https://images.unsplash.com/photo-1616628188466-bb219a03e8e3?w=600",
  },
  {
    id: 2,
    nome: "Jogo de Copos",
    preco: "R$ 79,90",
    imagem: "https://images.unsplash.com/photo-1606813902771-d9f3b6a0bfc3?w=600",
  },
  {
    id: 3,
    nome: "Conjunto de Pratos",
    preco: "R$ 99,90",
    imagem: "https://images.unsplash.com/photo-1565958011702-44e211b7e8b3?w=600",
  },
  {
    id: 4,
    nome: "Faqueiro Inox 24 Peças",
    preco: "R$ 149,90",
    imagem: "https://images.unsplash.com/photo-1606313564200-9b69d42d0e58?w=600",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Carrinho", { produto: item })}
    >
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>{item.preco}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛒 Katiana Store</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
  card: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    margin: 8,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  nome: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  preco: {
    fontSize: 14,
    color: "#FF6347",
    marginTop: 5,
  },
});
