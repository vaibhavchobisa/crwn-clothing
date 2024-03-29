import { LogoContainer, NavigationContainer, NavLinks, NavLink } from './navigation.styles';
// Link tag works like anchor tags just with some added functionality for react-router-dom to work efficiently.

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

// Fragment helps to save rendering resources by not rendering on unnecessary <div> tags 
// just to satisfy the rule of having a parent enclosing tag.
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
// import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { UserContext } from '../../contexts/user.context';   
// import { CartContext } from '../../contexts/cart.context';
import { selectCurrentUser } from '../../store/user/user.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

// SVG- Scalable Vector - Great for Logos since it doesn't pixelate on resizing.
// The logo has been imorted as a React component:
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { selectIsCartOpen } from '../../store/cart/cart.selector';


const Navigation = () => {
    // const { currentUser, setCurrentUser } = useContext(UserContext);
    const currentUser = useSelector(selectCurrentUser);
    // const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();


    const closeCartDropdownHandler = () => { if (isCartOpen) dispatch(setIsCartOpen(!isCartOpen)) };

    const logOutUser = () => {
        signOutUser();
        closeCartDropdownHandler();
    };
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
                        <span>Shop</span>
                    </NavLink>
                    {
                        currentUser ?
                            (
                                // This as property will render the NavLink component
                                // which is a Link or React Anchor tag as a span tag.
                                <NavLink as="span" onClick={logOutUser}>
                                    <span>Sign Out</span>
                                </NavLink>
                            )
                            :
                            (
                                <NavLink to='/auth' onClick={closeCartDropdownHandler}>
                                    <span>Sign In</span>
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