import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
import { selectIsCartOpen, selectCartItems } from "../../store/cart/cart.selector.js";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
    // const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
        dispatch(setIsCartOpen(!isCartOpen));
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                    ) : (
                        <EmptyMessage>Your cart is empty.</EmptyMessage>
                    )
                }
            </CartItems>
            {
                cartItems.length ? <Button onClick={goToCheckoutHandler}>checkout</Button>
                    : null
            }
        </CartDropdownContainer>
    );
};

export default CartDropdown;