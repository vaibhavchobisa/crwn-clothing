import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};