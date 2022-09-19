import React, { Component } from 'react';

import './ProductPage.scss'

import { connect } from 'react-redux';

import { gql } from '@apollo/client';
import { apolloClient } from '../../Apollo/apolloClient';
import { PRODUCT_QUERY } from '../../Apollo/querries';

import { addProductToList, incrementQuantity } from './productSlice';
import { changingCardId } from '../CategoryPage/cartSlice';

import { Interweave } from 'interweave'

import { priceFormat } from '../../Utilities/Utilities';


class ProductPage extends Component {
    constructor(props) {
        super(props)

        this.handleAddProductToCart = this.handleAddProductToCart.bind(this)
        this.handleChooseAtribiute = this.handleChooseAtribiute.bind(this)
    }

    state = {
        product: {},
        choosenThumbnail: 0,
        choosenAttributes: {},
        flagIsAttributesAreChosen: false
    }

    componentDidMount() {
        apolloClient
            .query({
                query: gql`${PRODUCT_QUERY}`, variables: { "id": this.props.cartId }
            })
            .then((res) => (this.setState({ product: res.data.product })))
            .catch(err => console.warn(err))

        // added seaech params to state
        let par = ((new URL(document.location)).searchParams)
        this.props.changingCardId(par.get('id'))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cartId === this.props.cartId) return null

        apolloClient
            .query({
                query: gql`${PRODUCT_QUERY}`, variables: { "id": this.props.cartId }
            })
            .then((res) => (this.setState({ product: res.data.product })))
            .catch(err => console.warn(err))
    }

    componentWillUnmount() {
        this.setState({
            product: {},
            choosenThumbnail: 0,
            choosenAttributes: {},
        })
    }

    handleAddProductToCart() {
        const { productList, addProductToList, incrementQuantity, cartId } = this.props

        if (!Boolean(Object.keys(this.state.choosenAttributes).length === this.state.product.attributes.length)) {
            this.setState({ flagIsAttributesAreChosen: true });
            return null
        }

        const isAttribiuteEquale = productList?.find(el => el.id === cartId && JSON.stringify(el.attributes) === JSON.stringify(this.state.choosenAttributes));

        this.setState({ flagIsAttributesAreChosen: false });
        if (Boolean(this.state.choosenAttributes) && !Boolean(isAttribiuteEquale)) {

            addProductToList({ id: cartId, attributes: this.state.choosenAttributes, quantity: 1, prices: this.state.product.prices })

        } else {
            const productindex = productList?.findIndex(el => el.id === cartId && JSON.stringify(el.attributes) === JSON.stringify(this.state.choosenAttributes))

            incrementQuantity(productindex)
        }
    }

    handleChooseAtribiute = (name, value) => {

        const stringObjSort = Object
            ?.entries({ ...this.state.choosenAttributes, [name]: value })
            ?.sort((a, b) => a[0]?.toLocaleLowerCase()?.localeCompare(b[0]?.toLocaleLowerCase()))

        this.setState({ choosenAttributes: Object.fromEntries(stringObjSort) })
    }

    render() {
        const { handleChooseAtribiute, handleAddProductToCart } = this

        const { gallery, brand, name, inStock, description, prices, attributes } = this.state.product

        const { choosenThumbnail, choosenAttributes, flagIsAttributesAreChosen } = this.state

        const { currencyIndex } = this.props

        const showAttributes = attributes?.map(({ name, id, items, type }) => (
            <div key={id} className='attributes'>

                <p className='attributes__name'>{name}:</p>

                <ul className='attributes__div'>
                    {items?.map(({ displayValue, id, value }) => (
                        <li onClick={() => { handleChooseAtribiute(name, id) }} key={id} className={`attributes__div__${type} ${choosenAttributes?.[name] === id && "attributes__div__" + type + "--active"}`} style={{
                            'backgroundColor': `${value}`
                        }}>{type !== "swatch" && displayValue}</li>))}
                </ul>
            </div>)
        )

        const thumbnails = gallery?.map((el, index) => <img className={`product-page__thumbnails__thumbnails-img`} key={el} src={el} alt="" onClick={() => this.setState({ choosenThumbnail: index })} />)

        return (<section className={`product-page`} >
            <div className={`product-page__thumbnails`} style={{ overflowY: gallery?.length > 4 ? 'scroll' : 'none' }}>
                {thumbnails}
            </div>

            <div className={`product-page__img-div ${!inStock && `product-page__img-div__out-of-stock-img`}`}>
                <img className={`product-page__img-div__main-img`} src={gallery?.[choosenThumbnail]} alt="" />

                {!inStock && <p className={`product-page__img-div__out-of-stock-text`}>out of stock</p>}
            </div>

            <div className={`product-page__text`}>
                <h2 className={`product-page__text__brand`}>{brand}</h2>
                <h3 className={`product-page__text__name`}>{name}</h3>

                {showAttributes}

                <p className={`product-page__text__price`}>price:</p>
                <p className={`product-page__text__amount`}>{prices?.[currencyIndex]?.currency.symbol}{priceFormat(prices?.[currencyIndex]?.amount)}</p>

                {flagIsAttributesAreChosen && <p className={`product-page__text__warning`}>You should choose all attributes like size, color etc...</p>}

                <button disabled={!inStock} className={`product-page__text__btn`} style={{ backgroundColor: !inStock && '#A3D7B1' }} onClick={handleAddProductToCart}>{inStock ? `add to cart` : `out of stock`}</button>

                <Interweave className={`product-page__text__description`} content={description} />

            </div>

        </section>);
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies,
    cartId: state.cart.cartId,
    productList: state.product.productList
})

export default connect(mapStateToPrps, { addProductToList, incrementQuantity, changingCardId })(ProductPage);