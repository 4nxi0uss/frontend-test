import React, { Component } from 'react';

import './ProductRow.scss'

import { apolloClient } from '../../../../Apollo/apolloClient';
import { gql } from '@apollo/client';

import { connect } from 'react-redux';
import { changingCategory } from '../../../Header/headerSlice';
import { decrementQuantity, incrementQuantity, removeProduct } from '../../../ProductPage/productSlice';

import { handleChangeQuantity } from '../../../../Utilities/Utilities';

const CATEGORY_QUERY = `query getProducts($id: String!) {
    product(id: $id) {
      id name gallery attributes {
        id name type items {
          displayValue value id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
      brand
    } } `

class ProductRow extends Component {
    constructor(props) {
        super(props)

        this.handleChangethumbnail = this.handleChangethumbnail.bind(this)
    }

    state = {
        productData: {},
        thumbnailsId: 0
    }

    componentDidMount() {
        apolloClient
            .query({
                query: gql`${CATEGORY_QUERY}`, variables: { id: this.props.id }
            })
            .then((res) => (this.setState({ productData: res.data.product })))
            .catch(err => console.warn(err))
    }

    handleChangethumbnail(increment) {
        const quantityOfThumbnails = this.state?.productData?.gallery?.length

        if (increment && quantityOfThumbnails > this.state.thumbnailsId + 1) {

            this.setState({ thumbnailsId: this.state.thumbnailsId + 1 })
        }

        if (increment === false && this.state.thumbnailsId > 0) {
            this.setState({ thumbnailsId: this.state.thumbnailsId - 1 })
        }
    }

    render() {
        const { currencyIndex, quantity, choosenAttributes, index } = this.props

        const { gallery, brand, name, prices, attributes } = this.state.productData

        const { thumbnailsId } = this.state

        const showAttributes = attributes?.map(({ name, id, items, type }) => (
            <div key={id} className='attributes-row'>

                <p className='attributes-row__name'>{name}:</p>

                <ul className='attributes-row__div'>
                    {items?.map(({ displayValue, id, value }) => (
                        <li key={id} className={`attributes-row__div__${type} ${choosenAttributes?.[name] === id && "attributes-row__div__" + type + "--active"}`} style={{
                            'backgroundColor': `${value}`
                        }}>{type !== "swatch" && displayValue}</li>))}
                </ul>
            </div>)
        )

        return (
            <article className={`product`}>
                <div className={`product__details`}>
                    <h3 className={`product__details__brand`}>{brand}</h3>
                    <h4 className={`product__details__name`}>{name}</h4>
                    <p className={`product__details__price`}>{prices?.[currencyIndex]?.currency.symbol}{prices?.[currencyIndex]?.amount}</p>
                    {showAttributes}
                </div>
                <div className={`product__div`}>
                    <div className={`product__div__increase-amount`}>
                        <button className={`product__div__increase-amount__btn`} onClick={() => { handleChangeQuantity(true, index, this.props) }}>+</button>
                        <p className={`product__div__increase-amount__product-amount`}>{quantity}</p>
                        <button className={`product__div__increase-amount__btn`} onClick={() => { handleChangeQuantity(false, index, this.props) }}>-</button>
                    </div>
                    <div className={`product__div__div-img`}>
                        <img src={gallery?.[thumbnailsId]} alt="" className={`product__div__div-img__img`} />
                        <div className={`product__div__div-img__img-switch`} style={({ display: `${gallery?.length === 1 ? 'none' : 'flex'}` })} >
                            <button className={`product__div__div-img__img-switch__btn`} onClick={() => { this.handleChangethumbnail(false) }}>{`<`}</button>
                            <button className={`product__div__div-img__img-switch__btn`} onClick={() => { this.handleChangethumbnail(true) }}>{`>`}</button>
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

export default connect(mapStateToPrps, { changingCategory, incrementQuantity, decrementQuantity, removeProduct })(ProductRow);