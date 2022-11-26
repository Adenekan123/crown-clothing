import {
  CartItemContainer,
  ItemDetails,
  ItemName,
  ItemPrice,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartitem }) => {
  const { name, quantity, imageUrl, price } = cartitem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <ItemPrice>
          {quantity} x ${price}
        </ItemPrice>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
