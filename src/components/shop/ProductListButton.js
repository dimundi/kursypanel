import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductListButton = ({ prodDefId, inStore, handleAddToCart }) => {

    const lowestPriceVariantId = (variants) => {
        let variantId = null;
        let lowestprice = 999999;
        variants.forEach(element => {
            if(element.price <= lowestprice)
                variantId = element.productId;
        });
        return variantId;
    }

    if(inStore.length === 1)
        return( <>
          <button className="add-to-cart button is-info mr-3"  onClick={handleAddToCart( lowestPriceVariantId(inStore) )}>Do koszyka</button>
        </> );
    else
        return(
          <NavLink to={'/product/' + prodDefId} className="button is-info mr-3">Wybierz termin</NavLink>
        );
}

export default ProductListButton;