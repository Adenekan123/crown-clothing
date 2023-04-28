import { useSelector } from "react-redux";


import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutHeaderBlock,
  CheckoutTotal,
} from "./checkout.styles.jsx";
import PaymentForm from "../../components/payment-form/payment-form.component";

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartPrice = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutHeaderBlock>
          <span>Product</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Decsription</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Quantity</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Price</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Remove</span>
        </CheckoutHeaderBlock>
      </CheckoutHeader>

      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <CheckoutTotal>Total: ${cartPrice}</CheckoutTotal>
      <PaymentForm/>
    </CheckoutContainer>
  );
}

export default Checkout;
