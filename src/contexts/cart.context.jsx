import { createContext, useReducer, useEffect } from "react";


const getCartTotal =(cartItems) =>{
  return cartItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

} 
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
  return cartItems.concat({...productToAdd,quantity:1})

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

const INITIAL_STATE = {
  isCartOpen:false,
  cartItems:[],
  cartCount:0,
  cartPrice:0
}

const CART_ACTION_TYPES = {
  SET_CART_ITEM:"SET_CART_ITEM",
  SET_IS_CART_OPEN:"SET_IS_CART_OPEN",
}

const cartReducer = (state,action) =>{
  const {type,payload} = action;

  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return {...state,...payload}
    

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return  {...state,isCartOpen:!state.isCartOpen}
      

    default:
      throw new Error(`Unhandled type ${type}`); 
  }
}

export const CartProvider = ({ children }) => {

  const [state,dispatch] = useReducer(cartReducer,INITIAL_STATE);

  const {cartItems,cartCount,cartPrice,isCartOpen} = state;

  const updateCartReducer = (newCartItems) =>{
    const newCartCount = newCartItems.reduce((acc,cartItem)=> acc+cartItem.quantity,0);
    const newCartPrice = getCartTotal(newCartItems);

    dispatch({type:CART_ACTION_TYPES.SET_CART_ITEM,payload:{cartItems:newCartItems,cartPrice:newCartPrice,cartCount:newCartCount}});
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd);
    updateCartReducer(newCartItems);
  };

  const setIsCartOpen = () => dispatch({type:CART_ACTION_TYPES.SET_IS_CART_OPEN})

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems,productToRemove)
    updateCartReducer(newCartItems);
  };

  const deteleItemFromCart = (productToDelete) => {
    const newCartItems = deleteCartItem(cartItems,productToDelete);
    updateCartReducer(newCartItems);
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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
