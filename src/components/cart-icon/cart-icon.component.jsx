// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
// import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles.jsx";


const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartItems, cartCount } = useContext(CartContext);
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    // One way to calculate netQuantity, which is to be updated inside the cart icon.
    // (find the other way at cart.context)
    // const quantityArray = cartItems.map((item) => item.quantity);
    // const netQuantity = quantityArray.reduce((accumulator, currentElement) => accumulator + currentElement, 0)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;