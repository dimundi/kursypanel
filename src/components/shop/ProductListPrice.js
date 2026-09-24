import React from 'react';

const ProductListPrice = ({ inStore }) => {
   
    const findLowestPrice = variants => {
        
        if(variants.length === 0)
            return 0;

        let lowestprice = 999999;
        variants.forEach(element => {
            if(element.price <= lowestprice)
                lowestprice = element.price;
        });

        return lowestprice;
    }

    return(
        <span className="mr-3 is-light product-list-price">{findLowestPrice(inStore)} zł</span>
        
    );
}

export default ProductListPrice;