import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  // Carregar carrinho salvo
  useEffect(() => {
    const carregarCarrinho = async () => {
      const data = await AsyncStorage.getItem("@carrinho");
      if (data) setCarrinho(JSON.parse(data));
    };
    carregarCarrinho();
  }, []);

  // Salvar sempre que atualizar
  useEffect(() => {
    AsyncStorage.setItem("@carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}
