// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
    from "firebase/auth";

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection,
    writeBatch,
    query,
    getDocs
} 
    from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// similar to userDocRef (refer the same)
export const addCollectionAndDocuments = async (collectionKey, objecstToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objecstToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    
    await batch.commit();
    // console.log("done");
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    // getDocs here is the asynchronous ability to fetch those document snapshots that we want
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
}; 

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);

    // getDoc is used to get user data
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

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
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("Error creating the user.", error.message);
        }
    }

    // If user data exists:
    // return userDocRef:
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

// These export arrow functions are called- Interface Layer Functions or Helper Functions
export const signOutUser = async () => await signOut(auth);

// this is the observer open listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);