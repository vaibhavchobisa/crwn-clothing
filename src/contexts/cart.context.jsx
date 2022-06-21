import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cardItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if found, increment quantity. ALso we'll return a new array instead of mutating
    if (existingCartItem) {
        return (
            cartItems.map((cartItem) =>
                cartItem.id === productToAdd.id ?
                    { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem)

            // Below is a wrong approach, altho helpful in understanding
            // [...cartItems, { ...existingCartItem, quantity: existingCartItem.quantity + 1 }]
        );
    }
    // return new array with modified cart items / new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }]
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemtoCart: () => { },
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const netCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(netCartCount);
    }, [cartItems])

    // Note- cartItems is an object whereas productToAdd is an object.
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};