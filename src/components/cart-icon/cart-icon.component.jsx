import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItems, cartCount } = useContext(CartContext);

    // One way to calculate netQuantity, which is to be updated inside the cart icon.
    // (find the other way at cart.context)
    // const quantityArray = cartItems.map((item) => item.quantity);
    // const netQuantity = quantityArray.reduce((accumulator, currentElement) => accumulator + currentElement, 0)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon;