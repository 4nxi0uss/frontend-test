import React, { Component } from 'react';

import './ProductRowOverlay.scss'

import { apolloClient } from '../../../../Apollo/apolloClient';
import { gql } from '@apollo/client';
import { PRODUCT_SHORT_QUERY } from '../../../../Apollo/querries';

import { connect } from 'react-redux';
import { changingCategory } from '../../headerSlice';
import { decrementQuantity, incrementQuantity, removeProduct } from '../../../ProductPage/productSlice';

import { handleChangeQuantity, priceFormat } from '../../../../Utilities/Utilities';

class ProductRowOverlay extends Component {
    constructor(props) {
        super(props)

        this.handleChangethumbnail = this.handleChangeThumbnail.bind(this)
    }

    state = {
        productData: {},
        thumbnailsId: 0
    }

    componentDidMount() {
        apolloClient
            .query({
                query: gql`${PRODUCT_SHORT_QUERY}`, variables: { id: this.props.id }
            })
            .then((res) => (this.setState({ productData: res.data.product })))
            .catch(err => console.warn(err))
    }

    handleChangeThumbnail(increment) {
        const quantityOfThumbnails = this.state?.productData?.gallery?.length

        if (increment && quantityOfThumbnails > this.state.thumbnailsId + 1) {

            this.setState({ thumbnailsId: this.state.thumbnailsId + 1 })
        } else if (increment && quantityOfThumbnails === this.state.thumbnailsId + 1) {
            this.setState({ thumbnailsId: 0 })
        }

        if (increment === false && this.state.thumbnailsId > 0) {
            this.setState({ thumbnailsId: this.state.thumbnailsId - 1 })
        }
        else if (increment === false && this.state.thumbnailsId === 0) {
            this.setState({ thumbnailsId: quantityOfThumbnails - 1 })
        }
    }

    render() {

        const { currencyIndex, quantity, choosenAttributes, index } = this?.props

        const { gallery, brand, name, prices, attributes } = this.state?.productData

        const { thumbnailsId } = this.state

        const showAttributes = (attributes, choosenAttributes,) => (attributes?.map(({ name, id, items, type }) => (
            <div key={id} className='attributes-overlay'>

                <p className='attributes-overlay__name'>{name}:</p>

                <ul className='attributes-overlay__div'>
                    {items?.map(({ displayValue, id, value }) => (
                        <li key={id} className={`attributes-overlay__div__${type} ${choosenAttributes?.[name] === id && "attributes-overlay__div__" + type + "--active"}`} style={{
                            'backgroundColor': `${value}`
                        }}>{type !== "swatch" && displayValue}</li>))}
                </ul>
            </div>)
        ))

        return (
            <article className={`product-overlay`}>
                <div className={`product-overlay__details`}>
                    <h3 className={`product-overlay__details__brand`}>{brand}{<br />}{name}</h3>
                    <p className={`product-overlay__details__price`}>{prices?.[currencyIndex]?.currency.symbol}{priceFormat(prices?.[currencyIndex]?.amount)}</p>
                    {showAttributes(attributes, choosenAttributes)}
                </div>
                <div className={`product-overlay__div`}>
                    <div className={`product-overlay__div__increase-amount`}>
                        <button className={`product-overlay__div__increase-amount__btn`} onClick={() => { handleChangeQuantity(true, index, this.props) }}>+</button>
                        <p className={`product-overlay__div__increase-amount__product-amount`}>{quantity}</p>
                        <button className={`product-overlay__div__increase-amount__btn`} onClick={() => { handleChangeQuantity(false, index, this.props) }}>-</button>
                    </div>
                    <div className={`product-overlay__div__div-img`}>
                        <img src={gallery?.[thumbnailsId]} alt="" className={`product-overlay__div__div-img__img`} />
                        <div className={`product-overlay__div__div-img__img-switch`} style={({ display: `${gallery?.length === 1 ? 'none' : 'flex'}` })} >
                            <button className={`product-overlay__div__div-img__img-switch__btn`} onClick={() => { this.handleChangeThumbnail(false) }}>{`<`}</button>
                            <button className={`product-overlay__div__div-img__img-switch__btn`} onClick={() => { this.handleChangeThumbnail(true) }}>{`>`}</button>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies,
    productList: state.product.productList
})

export default connect(mapStateToPrps, { changingCategory, incrementQuantity, decrementQuantity, removeProduct })(ProductRowOverlay);