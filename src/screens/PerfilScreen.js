import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { PedidosContext } from "../context/PedidosContext";

export default function PerfilScreen() {
  const { pedidos } = useContext(PedidosContext);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        }}
        style={styles.avatar}
      />
      <Text style={styles.nome}>João Pedro</Text>
      <Text style={styles.email}>joaopedro@katianastore.com</Text>

      <Text style={styles.tituloPedidos}>📦 Meus Pedidos</Text>
      {pedidos.length === 0 ? (
        <Text style={styles.semPedidos}>Nenhum pedido realizado ainda.</Text>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.pedidoCard}>
              <Text style={styles.data}>{item.data}</Text>
              {item.itens.map((p, i) => (
                <Text key={i} style={styles.item}>
                  {p.nome} - R$ {p.preco}
                </Text>
              ))}
              <Text style={styles.total}>Total: R$ {item.total.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 10,
  },
  nome: { fontSize: 22, fontWeight: "bold", color: "#E63946" },
  email: { fontSize: 14, color: "#777", marginBottom: 20 },
  tituloPedidos: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E63946",
    marginBottom: 10,
  },
  pedidoCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    width: 300,
    marginBottom: 10,
  },
  data: { fontSize: 12, color: "#999", marginBottom: 5 },
  item: { fontSize: 15, color: "#333" },
  total: { marginTop: 5, fontWeight: "bold", color: "#E63946" },
  semPedidos: { color: "#999", fontSize: 15 },
});
