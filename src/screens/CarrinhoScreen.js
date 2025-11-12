import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function CarrinhoScreen() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigation = useNavigation();

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.preco), 0);

  const finalizarPedido = () => {
    const pedido = {
      data: new Date().toLocaleString("pt-BR"),
      itens: cartItems,
      total,
    };
    clearCart();
    navigation.navigate("Confirmacao", { pedido });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      {cartItems.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>Seu carrinho está vazio!</Text>
        </View>
      ) : (
        <View style={styles.center}>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>{item.nome}</Text>
                <Text style={styles.price}>R$ {item.preco}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.remove}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.button} onPress={finalizarPedido}>
            <Text style={styles.buttonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#E63946",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    width: 300,
    marginVertical: 6,
  },
  name: { fontSize: 16, fontWeight: "600" },
  price: { color: "#E63946", fontWeight: "600" },
  remove: { color: "red", fontSize: 13 },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#E63946",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
    marginBottom: 100,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  empty: { fontSize: 16, color: "#666", textAlign: "center" },
});
