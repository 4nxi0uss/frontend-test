import React, { Component } from 'react';

import './ProductCard.scss'

import img from '../../../../img/test-product.png'
import img2 from '../../../../img/test-product2.png'
import addToCart from '../../../../img/add-to-cart.svg'

class ProductCard extends Component {
    state = {}

    render() {

        const handleAddToCart = (e) => {
            console.log(e)
        }

        return (<article className={`product-card `}>
            <div className={`product-card__div-img ${!this.props.inStock && ' product-card__out-of-stock-img'}`}>
                <img src={img} alt="img" className={`product-card__div-img__img `} />
                {!this.props.inStock && <p className={`product-card__div-img__text`}>out of stock</p>}

                {this.props.inStock && <img src={addToCart} alt="add to cart" className={`product-card__add-to-cart`} onClick={handleAddToCart} />}
            </div>
            <p className={`product-card__title ${!this.props.inStock && ' product-card__out-of-stock-text'}`}>Apollo Running Short</p>
            <p className={`product-card__price ${!this.props.inStock && ' product-card__out-of-stock-text'}`}>$50.00</p>
        </article>);
    }
}

export default ProductCard;