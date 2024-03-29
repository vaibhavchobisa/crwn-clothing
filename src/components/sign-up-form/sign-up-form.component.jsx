// useState() is used in forms to visually update everything that the user types in the input fields. 
// (weird right? Well that's how React works.)

import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // Reason for commenting out: onAuthStateChangedListener observer (open listener)
    // has been invoked.
    // const { setCurrentUser } = useContext(UserContext);

    // console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password and Confirm Password are different.");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.');
            }
            else { console.log('User creation encountered an error.', error); }
        }
    };

    const handleChange = (event) => {
        // console.log(event)
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" required type="text" onChange={handleChange} name='displayName' value={displayName} />
                <FormInput label="Email" required type="email" onChange={handleChange} name='email' value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name='password' value={password} />
                <FormInput label="Confirm Password" required type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
};

export default SignUpForm;