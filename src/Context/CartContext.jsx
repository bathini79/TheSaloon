// src/context/CartContext.js
import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart,selectedLocation, setSelectedLocation }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
