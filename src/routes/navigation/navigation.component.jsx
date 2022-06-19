import './navigation.styles.scss';
import { Outlet, Link } from "react-router-dom";
// Link tag works like anchor tags just with some added functionality for reac-router-dom to work efficiently.

// Fragment helps to save rendering resources by not rendering on unnecessary <div> tags 
// just to satisfy the rule of having a parent enclosing tag.
import { Fragment } from "react";

// SVG- Scalable Vector - Great for Logos since it doesn't pixelate on resizing.
// The logo has been imorted as a React component:
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

const Navigation = () => {
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
                    <Link className="nav-link" to='/auth'>
                        Sign In
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;