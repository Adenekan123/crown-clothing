import React, { useContext } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
} from "./checkout-item.styles.jsx";

import { removeCartItem,addCartItem,deleteCartItem } from "../../utils/cart/cart.utils.js";
import { setCartItem } from "../../store/cart/cart.action.js";
import { selectCartItems } from "../../store/cart/cart.selector.js";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();

 const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;

  
  const addItemHandler = () =>{
    const newCartItems = addCartItem(cartItems,cartItem);
    dispatch(setCartItem(newCartItems));
  } 

  const removeItemHandler = () =>{
    const newCartItems = removeCartItem(cartItems,cartItem);
    dispatch(setCartItem(newCartItems));
  } 

  const deleteItemHandler = () =>{
    const newCartItems = deleteCartItem(cartItems,cartItem);
    dispatch(setCartItem(newCartItems));
  };


  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <span className="name">{name}</span>
      <Quantity as="span">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </Quantity>
      <span className="price">{price}</span>
      <div className="remove-buton" onClick={deleteItemHandler}>
        &#10005;
      </div>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
