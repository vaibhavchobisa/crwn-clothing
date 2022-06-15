import { signInWithGooglePopUp, createUserDocumentFromAuth } from "../../utils/firebase.utils";


const SignIn = () => {
    // Always use async functions to load databases, so they get loaded before any other code gets executed.
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
        // const response = await signInWithGooglePopUp();
        // console.log(response);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign In With Google Pop Up
            </button>
        </div>
    );
};

export default SignIn;