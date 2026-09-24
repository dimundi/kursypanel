import React, {useState} from 'react';
//import addToCart from '../addToCart';
import { NavLink } from 'react-router-dom';

const ShopProduct = product => {

    const [msg] = useState("");

    // const handleAddToCart = id => () => {
    //     addToCart.addToCart(id, setMsg);
    // }

    return (
    <NavLink key={product.prodDefId} to={'/product/' +  product.c + '/' + product.prodDefId} className="course">
    <div>
        <div className="course-bg" style={{backgroundImage: 'url('+product.img+')' }}></div>
        <div className="course-shopinfo">
            <div>{product.atLabels.map((type, index) =>
                <span key={index} className="area-type">{type}</span>
            )}
            <h3 className="title has-text-dark mt-4">{product.name}</h3>
            <span>{product.c}</span>
            </div>
        {msg}
        </div>
    </div>
    </NavLink>
    );
}

export default ShopProduct;