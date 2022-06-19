// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
    // auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    // signInWithGoogleRedirect
} from "../../utils/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {

    // useEffect(() => async () => {
    //     const response = await getRedirectResult(auth);

    //     if (response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, []);


    // Always use async functions to load databases, so they get loaded before any other code gets executed.
    const logPopupGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logPopupGoogleUser}>
                Sign In With Google Popup
            </button>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign In With Google Redirect
            </button> */}
            <SignUpForm />
        </div >
    );
};

export default SignIn;