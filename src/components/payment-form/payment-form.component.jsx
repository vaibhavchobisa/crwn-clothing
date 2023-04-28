import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        // if you type create-payment-intent with its .js extension, it will cause an error
        // also, using netlify instea of the .netlify in the below path, which is created when we run the nettlify dev command
        // will also trigger multiple (for me, 2) errors
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then((res) => res.json());

        // destructuring the client secret from response:
        const { paymentIntent: { client_secret }, } = response;
        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                    // add more details like email if you want
                },
            },
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert("Payment Successful");
            }
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Enter Credit/Debit Card details:</h2>
                <CardElement />
                <PaymentButton
                    isLoading={isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >
                    Pay Now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;