import React, { useContext } from "react";
import { View,Text,FlatList,Image,TouchableOpacity,StyleSheet,StatusBar, } from "react-native";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  const produtos = [
    { id: 1, nome: "Jogo de Taças 325ml", preco: 87.0, imagem: require("../../assets/produtos/tacas.jpg") },
    { id: 2, nome: "Lençol Malha Solteiro", preco: 88.0, imagem: require("../../assets/produtos/lencol.jpg") },
    { id: 3, nome: "Kit Cozinha 2 Peças", preco: 38.0, imagem: require("../../assets/produtos/cozinha.jpg") },
    { id: 4, nome: "Jogo de Banheiro Indiano", preco: 70.0, imagem: require("../../assets/produtos/banheiro.jpg") },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Text style={styles.logo}> Katiana Store</Text>
      <Text style={styles.subtitulo}>Produtos selecionados para você</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                addToCart(item);
                navigation.navigate("Carrinho");
              }}
            >
              <Text style={styles.textoBotao}>Comprar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", paddingTop: 50 },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#E63946",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  lista: { paddingHorizontal: 10, paddingBottom: 100 },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imagem: { width: 130, height: 130, borderRadius: 10, marginBottom: 8 },
  nome: { fontSize: 15, fontWeight: "600", textAlign: "center", color: "#333" },
  preco: { fontSize: 15, color: "#E63946", marginVertical: 4, fontWeight: "bold" },
  botao: {
    backgroundColor: "#E63946",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 6,
  },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
