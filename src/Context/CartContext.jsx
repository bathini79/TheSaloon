// src/context/CartContext.js
import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const addToCart = (service) => {
    setCart((prevCart = []) => [...prevCart, service]);
  };
  
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Remove the cart from localStorage
  };
  const removeItemFromCart = (itemId) => {
    // Remove the item with the given itemId from the cart
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.$id !== itemId);
      // Update localStorage to reflect the change
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  

  return (
    <CartContext.Provider value={{ cart,setCart, addToCart, clearCart,selectedLocation, setSelectedLocation ,removeItemFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
