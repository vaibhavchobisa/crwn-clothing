// useState() is used in forms to visually update everything that the user types in the input fields. 
// (weird right? Well that's how React works.)

import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase.utils";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // Commented out coz useless coz of use of onAuthStateChanged.
    // const { setCurrentUser } = useContext(UserContext);

    // console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

            // Rather than using setCurrentUser method to set context again and again
            // in different files, we use the Open Listener (Observer) called onAuthStateChanged
            // that always keeps a track of authentication state (be it logged in or out).  
            // setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password for email.");
                    break;

                case 'auth/user-not-found':
                    alert("No user associated with this email.");
                    break;

                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        // console.log(event)
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        // setCurrentUser(user);
        // await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="email" onChange={handleChange} name='email' value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name='password' value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    {/* By default buttons are of the type 'submit',
                mention type to override this default behavior. */}
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;