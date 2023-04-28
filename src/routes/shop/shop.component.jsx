// this import creates SHOP_DATA and stores all the data in the link in it.
// import SHOP_DATA from '../../shop-data.json';

import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { setCategoriesMap } from "../../store/categories/category.action";

import "./shop.styles.scss";


const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            // console.log(categoryMap);
            // console.log(categoriesArray);
            dispatch(setCategoriesMap(categoriesArray));
        };
        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />

            {/* (:) - Using useParams from react-router-dom. You can use any name for the same
            rather than category, since it's a variable.  */}
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;