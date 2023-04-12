export const getCartTotal =(cartItems) =>{
    return cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
  
  } 
  export const addCartItem = (cartItems, productToAdd) => {
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
  export const removeCartItem = (cartItems, productToRemove) => {
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
  
export const deleteCartItem = (cartItems, productToDelete) => {
   return cartItems.filter((item) => item.id !== productToDelete.id);
  };