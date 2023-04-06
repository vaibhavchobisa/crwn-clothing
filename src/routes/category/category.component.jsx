import "./category.styles.scss";
import { useParams } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
// import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
    const { category } = useParams();
    // const { categoriesMap } = useContext(CategoriesContext);
    // console.log('render/re-rendering category component')
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        // console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
                {
                    // the below code has been written because CategoriesContext fetches data
                    // from categoriesMap  
                    // asynchronously (which is an empty object initially)
                    // whereas all the code in this file runs synchronously
                    products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </>
    );
};

export default Category;