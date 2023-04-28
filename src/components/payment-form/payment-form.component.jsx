import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
    const [isProcessingPayment,setIsProcessingPayment] = useState(false);
    const elements = useElements();
    const stripe = useStripe();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const paymentHandler = async (e) =>{
        e.preventDefault();

        if(!elements || !stripe) return;

        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({amount:amount * 100})
        }).then(result => result.json());

        const {paymentIntent:{client_secret}} = response;
        const paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method:{
                card: elements.getElement(CardElement),
                billing_details:{
                    name: currentUser ? currentUser.displayName : "Guest"
                }
            }
        });
        setIsProcessingPayment(false);

        if(paymentResult.error) alert(paymentResult.error)
        else{
            if(paymentResult.paymentIntent.status === 'succeeded') alert('Payment Successful');
        }
    }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPES_CLASSES.inverted}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
