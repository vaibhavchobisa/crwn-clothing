// import { useContext } from "react";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
// import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import "./checkout.styles.scss";

const Checkout = () => {
    // const { cartItems, cartTotal } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal)

    // Another way to find total, instead of setting the value via cart.context
    // const totalAmount = cartItems.reduce((sum, cartItem) => sum + (cartItem.quantity * cartItem.price), 0);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((cartItem) => (
                    <CheckOutItem key={cartItem.id} cartItem={cartItem} />
                ))
            }
            <span className="total">Total: ${cartTotal}</span>
            <PaymentForm />
        </div>
    );
};

export default Checkout;