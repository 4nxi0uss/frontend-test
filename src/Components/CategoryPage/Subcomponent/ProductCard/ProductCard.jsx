import React, { Component } from 'react';

import './ProductCard.scss'

import addToCart from '../../../../img/add-to-cart.svg'
import { connect } from 'react-redux';

class ProductCard extends Component {
    state = {}

    render() {
        const { name, inStock, gallery, brand, prices, currencyIndex } = this.props

        const handleAddToCart = (e) => {
            console.log(e)
        }

        return (<article className={`product-card `}>
            <div className={`product-card__div-img ${!inStock && ' product-card__out-of-stock-img'}`}>
                <img src={gallery[0]} alt="img" className={`product-card__div-img__img `} />
                {!inStock && <p className={`product-card__div-img__text`}>out of stock</p>}

                {inStock && <img src={addToCart} alt="add to cart" className={`product-card__add-to-cart`} onClick={handleAddToCart} />}
            </div>
            <p className={`product-card__title ${!inStock && ' product-card__out-of-stock-text'}`}>{brand} {name}</p>
            <p className={`product-card__price ${!inStock && ' product-card__out-of-stock-text'}`}>{prices[currencyIndex].currency.symbol}{prices[currencyIndex].amount}</p>
        </article>);
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies
})

export default connect(mapStateToPrps)(ProductCard);