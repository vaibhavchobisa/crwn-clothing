// this import creates SHOP_DATA and stores all the data in the link in it.
// import SHOP_DATA from '../../shop-data.json';

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { fetchCategoriesAsync } from "../../store/categories/category.action";

import "./shop.styles.scss";


const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
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