import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
        setIsCartOpen(!isCartOpen)
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map((item) =>
                    (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                }
            </div>
            <Button onClick={goToCheckoutHandler}>checkout</Button>
        </div>
    );
};

export default CartDropdown;