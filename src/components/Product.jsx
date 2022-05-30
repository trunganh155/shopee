import React from 'react';

function Product({product}) {
    return (
        <div className='product'>
            <div className='product__image'>
                <img  src={product.image} alt="" />
            </div>
            <div className='product__name'>{product.name}</div>
            <div className='product__price'>{product.price}</div>
        </div>
    );
}

export default Product;