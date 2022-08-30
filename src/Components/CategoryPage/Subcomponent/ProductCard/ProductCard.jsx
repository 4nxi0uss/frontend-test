import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import './ProductCard.scss'

import addToCart from '../../../../img/add-to-cart.svg'

import { changingCardId } from '../../cartSlice';

class ProductCard extends Component {
    constructor(props) {
        super(props)

        this.handleOpenPage = this.handleOpenPage.bind(this)
    }

    state = {
        productFlag: false
    }

    componentDidMount() {
        this.setState({ productFlag: false })
    }

    handleOpenPage() {
        this.props.changingCardId(this.props.id);
        this.setState({ productFlag: true })
    }

    render() {
        const { name, inStock, gallery, brand, prices, id, currencyIndex } = this.props

        const { productFlag } = this.state

        const handleAddToCart = (e) => {
            console.log('cart', e)
        }

        return (
            <>
                {productFlag && <Navigate to={`/product-page/?id=${id}`} />}
                <article className={`product-card `} onClick={this.handleOpenPage}>
                    <div className={`product-card__div-img ${!inStock && ' product-card__out-of-stock-img'}`}>
                        <img src={gallery[0]} alt="img" className={`product-card__div-img__img `} />
                        {!inStock && <p className={`product-card__div-img__text`}>out of stock</p>}

                        {inStock && <img src={addToCart} alt="add to cart" className={`product-card__add-to-cart`} onClick={handleAddToCart} />}
                    </div>
                    <p className={`product-card__title ${!inStock && ' product-card__out-of-stock-text'}`}>{brand} {name}</p>
                    <p className={`product-card__price ${!inStock && ' product-card__out-of-stock-text'}`}>{prices[currencyIndex].currency.symbol}{prices[currencyIndex].amount}</p>
                </article>
            </>);
    }
}
const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies
})

export default connect(mapStateToPrps, { changingCardId })(ProductCard);