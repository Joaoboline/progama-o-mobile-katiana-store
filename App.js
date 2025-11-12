import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";
import { CartProvider } from "./src/context/CartContext";
import { PedidosProvider } from "./src/context/PedidosContext";

export default function App() {
  return (
    <PedidosProvider>
      <CartProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </CartProvider>
    </PedidosProvider>
  );
}
