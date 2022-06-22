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

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity = 1, if it is remove that item from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // if not, return back cartItems with matching cart item with reduced quantity
    return (
        cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem)
    );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    // apparently it does not matter even if you comment out this object!
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const netCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(netCartCount);
    }, [cartItems])

    // We could have collated this useEffect function in the previous useEffect,
    // but just like we want 1 function to handle one task,
    // it's a good practise to use diff useEffect calls for different tasks
    // for better readability.
    useEffect(() => {
        const netCartAmount = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        setCartTotal(netCartAmount);
    }, [cartItems])

    // Note- cartItems is an object whereas productToAdd is an object.
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        removeItemToCart,
        clearItemFromCart,
        cartTotal
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};