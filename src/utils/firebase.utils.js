// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6E0upokjxzb-wY3InMULtuOUuZIVQaMA",
    authDomain: "crwn-clothing-db-2b06f.firebaseapp.com",
    projectId: "crwn-clothing-db-2b06f",
    storageBucket: "crwn-clothing-db-2b06f.appspot.com",
    messagingSenderId: "305919184369",
    appId: "1:305919184369:web:f36c231533aef45b9bc850"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    // getDoc is used to get user data
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // Writing some Pseudo Code:
    // If user data doesn't exist:
    // create/set the document with the data from userAuth in my collection:
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("Error creating the user.", error.message);
        }
    }

    // If user data exists:
    // return userDocRef:
    return userDocRef;
};