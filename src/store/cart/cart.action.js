import { CART_ACTION_TYPES } from "./cart.type";

export const setCartItem = (newCartItems) =>{
    return {type:CART_ACTION_TYPES.SET_CART_ITEM,payload:newCartItems }
}


export const setIsCartOpen = (boolean) =>{
    return {type:CART_ACTION_TYPES.SET_IS_CART_OPEN,payload:boolean }
}

