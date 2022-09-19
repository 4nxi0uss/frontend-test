import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { addProductToList, incrementQuantity } from '../../../ProductPage/productSlice';

import './ProductCard.scss'

import { ReactComponent as AddToCart } from '../../../../img/add-to-cart.svg'

import { changingCardId } from '../../cartSlice';

import { priceFormat } from '../../../../Utilities/Utilities';

class ProductCard extends Component {
    constructor(props) {
        super(props)

        this.handleOpenPage = this.handleOpenPage.bind(this)
        this.handleAddProductToCart = this.handleAddProductToCart.bind(this)
    }

    state = {
        productFlag: false,
    }

    componentDidMount() {
        this.setState({ productFlag: false })
    }

    handleOpenPage(e) {
        if (e.target.ownerSVGElement?.tagName !== 'svg') {
            this.props.changingCardId(this.props.id);
            this.setState({ productFlag: true })
        }
    }

    handleAddProductToCart() {
        const { productList, addProductToList, incrementQuantity, attributes, prices, id } = this.props

        let atrObj = {}

        attributes.forEach(({ name, items }) => {

            const stringObjSort = Object
                ?.entries({ ...atrObj, [name]: items?.[0].id })
                ?.sort((a, b) => a[0]?.toLocaleLowerCase()?.localeCompare(b[0]?.toLocaleLowerCase()))
            atrObj = Object.fromEntries(stringObjSort)
        })

        const isAttribiuteEquale = productList?.find((el) => el.id === id && JSON.stringify(el.attributes) === JSON.stringify(atrObj));

        if (Boolean(atrObj) && !Boolean(isAttribiuteEquale)) {
            addProductToList({ id: id, attributes: atrObj, quantity: 1, prices: prices })

        } else {
            const productindex = productList?.findIndex(el => el.id === id && JSON.stringify(el.attributes) === JSON.stringify(atrObj))

            incrementQuantity(productindex)
        }
    }

    render() {
        const { name, inStock, gallery, brand, prices, id, currencyIndex } = this.props

        const { productFlag } = this.state

        const { handleOpenPage, handleAddProductToCart } = this

        return (
            <>
                {productFlag && <Navigate to={`/product-page/?id=${id}`} />}
                <article className={`product-card `} onClick={(e) => { handleOpenPage(e) }}>
                    <div className={`product-card__div-img ${!inStock && ' product-card__out-of-stock-img'}`}>
                        <img src={gallery[0]} alt="img" className={`product-card__div-img__img `} />
                        {!inStock && <p className={`product-card__div-img__out-of-stock-text`}>out of stock</p>}

                        {inStock && <AddToCart name={`add to cart`} alt="add to cart" className={`product-card__add-to-cart`} onClick={handleAddProductToCart} />}
                    </div>
                    <p className={`product-card__title ${!inStock && ' product-card__out-of-stock-text'}`}>{brand} {name}</p>
                    <p className={`product-card__price ${!inStock && ' product-card__out-of-stock-text'}`}>{prices[currencyIndex].currency.symbol}{priceFormat(prices[currencyIndex].amount)}</p>
                </article>
            </>);
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies,
    productList: state.product.productList
})

export default connect(mapStateToPrps, { changingCardId, addProductToList, incrementQuantity })(ProductCard);