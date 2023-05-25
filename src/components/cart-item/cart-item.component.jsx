import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, quantity } = cartItem;
    let { price } = cartItem;
    price = price * 80; //converting USD to INR
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name>{name}</Name>
                <span>{quantity} x ₹{price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;