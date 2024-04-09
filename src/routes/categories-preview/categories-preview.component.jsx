// this import creates SHOP_DATA and stores all the data in the link in it.
// import SHOP_DATA from '../../shop-data.json';

// import { useContext } from "react";
import { useSelector } from "react-redux";
// import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

import { selectCategoriesMap } from "../../store/categories/category.selector";
import { selectCategoriesIsLoading } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const iSLoading = useSelector(selectCategoriesIsLoading);

    return (
        <div className="shop-container">
            { iSLoading? (<Spinner/>) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                })
            )
            }
        </div>
    );
};

export default CategoriesPreview;