import { LogoContainer, NavigationContainer, NavLinks, NavLink } from './navigation.styles';
import { Outlet } from "react-router-dom";
// Link tag works like anchor tags just with some added functionality for react-router-dom to work efficiently.

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

// Fragment helps to save rendering resources by not rendering on unnecessary <div> tags 
// just to satisfy the rule of having a parent enclosing tag.
import { Fragment, useContext } from "react";

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

// SVG- Scalable Vector - Great for Logos since it doesn't pixelate on resizing.
// The logo has been imorted as a React component:
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from '../../utils/firebase.utils';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    const logOutUser = () => {
        signOutUser();
        closeCartDropdownHandler();
    };
    const closeCartDropdownHandler = () => { if (isCartOpen) setIsCartOpen(!isCartOpen) };
    // console.log(currentUser);

    // Commented out because of replaced use of observer open listener.
    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/' onClick={closeCartDropdownHandler}>
                    <CrwnLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop' onClick={closeCartDropdownHandler}>
                        Shop
                    </NavLink>
                    {
                        currentUser ?
                            (
                                // This as property will render the NavLink component
                                // which is a Link or React Anchor tag as a span tag.
                                <NavLink as="span" onClick={logOutUser}>
                                    Sign Out
                                </NavLink>
                            )
                            :
                            (
                                <NavLink to='/auth' onClick={closeCartDropdownHandler}>
                                    Sign In
                                </NavLink>
                            )
                    }
                    <CartIcon />
                </NavLinks>
                {/* Pay attention to the below code: "Short Circuit Operator" */}
                {
                    isCartOpen &&
                    <CartDropdown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;