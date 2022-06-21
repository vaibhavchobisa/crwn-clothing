import './navigation.styles.scss';
import { Outlet, Link } from "react-router-dom";
// Link tag works like anchor tags just with some added functionality for reac-router-dom to work efficiently.

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

// Fragment helps to save rendering resources by not rendering on unnecessary <div> tags 
// just to satisfy the rule of having a parent enclosing tag.
import { Fragment, useContext } from "react";

// SVG- Scalable Vector - Great for Logos since it doesn't pixelate on resizing.
// The logo has been imorted as a React component:

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from '../../utils/firebase.utils';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    // console.log(currentUser);

    // Commented out because of replaced use of observer open listener.
    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {
                        currentUser ?
                            (
                                <span className='nav-link' onClick={signOutUser}>Sign Out</span>
                            )
                            :
                            (
                                <Link className="nav-link" to='/auth'>
                                    Sign In
                                </Link>
                            )
                    }
                    <CartIcon />
                </div>
                {/* Pay attention to the below code: "Short Circuit Operator" */}
                {
                    isCartOpen &&
                    <CartDropdown />
                }
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;