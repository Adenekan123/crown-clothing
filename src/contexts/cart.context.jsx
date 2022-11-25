import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if cartitem contains product to allow for
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //if not return new array with modified cartitems / new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, productToRemove) => {
  //if product to remove exist
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  //if product quantity is 0 remove product entirely
  if (existingCartItem && existingCartItem.quantity === 1) {
    return deleteCartItem(cartItems, existingCartItem);
  }

  //if not reduce product quantity
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((item) => item.id !== productToDelete.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  deteleItemFromCart: () => null,
  cartCount: 0,
  cartPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const deteleItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    deteleItemFromCart,
    cartItems,
    cartCount,
    cartPrice,
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartPrice = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    setCartPrice(newCartPrice);
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
