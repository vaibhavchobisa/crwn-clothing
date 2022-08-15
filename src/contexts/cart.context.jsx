import { createContext, useState, useEffect, useReducer } from "react";

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
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    // the idea is to never write business logic in the reducer, to keep it simple
    // So, the logic has been written outside
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);


    // const setIsCartOpen = (toggleDropdown) => {
    //     dispatch({ type: CART_ACTION_TYPES.TOGGLE_DROPDOWN, payload: toggleDropdown });
    // }


    // useEffect(() => {
    //     const netCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(netCartCount);
    // }, [cartItems])

    // We could have collated this useEffect function in the previous useEffect,
    // but just like we want 1 function to handle one task,
    // it's a good practise to use diff useEffect calls for different tasks
    // for better readability.
    // useEffect(() => {
    //     const netCartAmount = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
    //     setCartTotal(netCartAmount);
    // }, [cartItems])


    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, isCartOpen, cartCount, cartTotal } = state;

    const updateCartItemsReducer = (newCartItems) => {
        // generate newCartTotal
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

        // generate newCartCount
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount },
        });
    };

    const setIsCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
    };


    // Note- cartItems is an array whereas productToAdd is an object.
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
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