import { createContext, useState, useEffect } from "react";

// import SHOP_DATA from "../shop-data.js";
// import { addCollectionAndDocuments } from "../utils/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments("categories", SHOP_DATA);
    // },
    //     []);

    // this is how an async function is called in useEffect-
    // by wrapping it in another asnyc function and then
    // invoking it next
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};