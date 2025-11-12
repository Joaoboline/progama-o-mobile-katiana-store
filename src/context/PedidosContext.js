import React, { createContext, useState } from "react";

export const PedidosContext = createContext();

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);

  const adicionarPedido = (pedido) => {
    setPedidos((prev) => [...prev, pedido]);
  };

  return (
    <PedidosContext.Provider value={{ pedidos, adicionarPedido }}>
      {children}
    </PedidosContext.Provider>
  );
}
