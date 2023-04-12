import React, { useContext } from "react";
import { useSelector,useDispatch } from "react-redux";
import { ProductCardContainer, Footer } from "./product-card.styles";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

import { addCartItem } from "../../utils/cart/cart.utils";
import { setCartItem } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const { name, price, imageUrl } = product;

  const addProductToCart = () => {
    const newCartItems = addCartItem(cartItems,product);
    dispatch(setCartItem(newCartItems));
  };
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <Button
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        type="button"
        onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
