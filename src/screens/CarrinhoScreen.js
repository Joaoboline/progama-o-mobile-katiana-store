import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function CarrinhoScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems
    .reduce((acc, item) => acc + item.preco * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione algum produto antes de finalizar!");
      return;
    }
    Alert.alert("Compra finalizada!", "Obrigado por comprar com a Katiana Store 🧡");
    clearCart();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
        <Text style={styles.quantidade}>Qtd: {item.quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        style={styles.botaoRemover}
      >
        <Text style={styles.textoRemover}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛒 Carrinho</Text>

      {cartItems.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.textoVazio}>Seu carrinho está vazio 😔</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.lista}
          />

          <View style={styles.resumo}>
            <Text style={styles.total}>Total: R$ {total}</Text>

            <TouchableOpacity style={styles.botaoFinalizar} onPress={handleCheckout}>
              <Text style={styles.textoBotao}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF6347",
    marginBottom: 10,
  },
  lista: {
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    marginVertical: 6,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  nome: {
    fontSize: 15,
    fontWeight: "600",
  },
  preco: {
    fontSize: 14,
    color: "#FF6347",
    marginTop: 3,
  },
  quantidade: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  botaoRemover: {
    backgroundColor: "#FF6347",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textoRemover: {
    color: "#fff",
    fontWeight: "bold",
  },
  resumo: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 15,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  botaoFinalizar: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textoVazio: {
    fontSize: 16,
    color: "#999",
  },
});
