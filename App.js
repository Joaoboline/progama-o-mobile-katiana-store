import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { initDatabase, addProduto, getProdutos } from "./src/database/database";

export default function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const setupDB = async () => {
      await initDatabase();
      const data = await getProdutos();

      if (data.length === 0) {
        const produtosIniciais = [
          {
            nome: "Jogo de Banheiro Indiano",
            preco: 70.0,
            imagem: "https://files.oaiusercontent.com/file-00000000021071f581cbd1b638a85481",
          },
          {
            nome: "Kit Cozinha 2 Peças",
            preco: 38.0,
            imagem: "https://files.oaiusercontent.com/file-00000000db7871f5b1842455c98e33aa",
          },
          {
            nome: "Lençol Malha Solteiro",
            preco: 88.0,
            imagem: "https://files.oaiusercontent.com/file-000000008efc71f5b46bb89847f4a052",
          },
          {
            nome: "Jogo de Taças 6 Peças (325ml)",
            preco: 87.0,
            imagem: "https://files.oaiusercontent.com/file-000000008f2071f581a757902dbcbef3",
          },
        ];

        for (let produto of produtosIniciais) {
          await addProduto(produto.nome, produto.preco, produto.imagem);
        }
      }

      const produtosAtualizados = await getProdutos();
      setProdutos(produtosAtualizados);
    };

    setupDB();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>🛒 Comprar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛍 Katiana Store</Text>
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
    fontSize: 15,
    marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  preco: {
    fontSize: 14,
    color: "#FF6347",
    marginTop: 4,
  },
  botao: {
    backgroundColor: "#FF6347",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
