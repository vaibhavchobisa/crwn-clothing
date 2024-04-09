import "./category.styles.scss";
import { useParams } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
// import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
    const { category } = useParams();
    // const { categoriesMap } = useContext(CategoriesContext);
    // console.log('render/re-rendering category component')
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        // console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            {
                isLoading? (<Spinner/>) 
                : (
                    <div className="category-container">
                        {
                            products &&
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        }
                    </div>
                )
            }
        </>
    );
};

export default Category;