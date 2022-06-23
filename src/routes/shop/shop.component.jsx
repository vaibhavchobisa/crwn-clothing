// this import creates SHOP_DATA and stores all the data in the link in it.
// import SHOP_DATA from '../../shop-data.json';

import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                // the below line converts keys in categoriesMap object into an array.
                Object.keys(categoriesMap).map(title => (
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className="products-container">
                            {
                                categoriesMap[title].map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            }
                        </div>
                    </Fragment>
                ))
            }
        </Fragment>
    );
};

export default Shop;