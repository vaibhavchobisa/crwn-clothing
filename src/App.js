import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component.jsx";
import Shop from "./routes/shop/shop.component.jsx";
import { Routes, Route } from "react-router-dom";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser  } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch(); 

  useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            // console.log(user);
            // below code updates sign-in/out stage whenever auth state changes
            dispatch(setCurrentUser(user));
        });
        // returning the function to execute it
        return unsubscribe;
    },
        []);
        // to remove the warning in the dependency array above, you can pass dispatch in it.
        // But it won't make a difference, since dispatch never changes.

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* Just the term index means index={true} */}
        {/* The below are all the "outlets" */}
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;