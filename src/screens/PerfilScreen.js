import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";

export default function PerfilScreen() {
  const handleLogout = () => {
    Alert.alert("Logout", "Você saiu da sua conta com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👤 Meu Perfil</Text>

      <View style={styles.perfilContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.nome}>Katiana Souza</Text>
        <Text style={styles.email}>katiana.store@gmail.com</Text>
      </View>

      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoSair]} onPress={handleLogout}>
          <Text style={[styles.textoBotao, { color: "#fff" }]}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.versao}>Versão do App: 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 20,
  },
  perfilContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#FF6347",
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  infoContainer: {
    width: "80%",
    marginTop: 20,
  },
  botao: {
    backgroundColor: "#fff",
    borderColor: "#FF6347",
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  botaoSair: {
    backgroundColor: "#FF6347",
    borderWidth: 0,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6347",
  },
  versao: {
    position: "absolute",
    bottom: 20,
    fontSize: 12,
    color: "#aaa",
  },
});
