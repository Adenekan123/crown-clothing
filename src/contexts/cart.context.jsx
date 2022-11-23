import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartIiems: [],
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartIiems, setCartItems] = useState([]);

  const value = { isCartOpen, setIsCartOpen, cartIiems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
