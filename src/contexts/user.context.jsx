import { createContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// to maintain all types easily, centralizing them all at one place
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload, };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};


export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const { currentUser } = state;
    // console.log(currentUser);

    const setCurrentUser = (user) => {
        // dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = { currentUser, setCurrentUser };
    // onAuthStateChangedListener function runs the callback function
    // everytime the auth state changes.
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            // console.log(user);
            // below code updates sign-in/out stage whenever auth state changes
            setCurrentUser(user);
        });
        // returning the function to execute it
        return unsubscribe;
    },

        []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};  