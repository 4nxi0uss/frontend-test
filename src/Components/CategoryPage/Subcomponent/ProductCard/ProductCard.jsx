import React, { Component } from 'react';

import './ProductCard.scss'

import img from '../../../../img/test-product.png'

class ProductCard extends Component {

    state = {}
    render() {
        return (<article className='product-card'>
            <img src={img} alt="img" className='product-card__img' />
            <p className='product-card__title'>Apollo Running Short</p>
            <p className='product-card__price'>$50.00</p>
        </article>);
    }
}

export default ProductCard;