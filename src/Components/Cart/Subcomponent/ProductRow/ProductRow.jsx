import React, { Component } from 'react';

import './ProductRow.scss'

import { showAttributes } from '../../../ProductPage/ProductPage';

import { apolloClient } from '../../../../Apollo/client';

import { gql } from '@apollo/client';
import { connect } from 'react-redux';

const CATEGORY_QUERY = `query getProducts($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
      brand
    }
  } `

class ProductRow extends Component {
    constructor(props) {
        super(props)

        this.handleChangethumbnail = this.handleChangethumbnail.bind(this)
    }

    state = {
        product: {},
        thumbnailsId: 0
    }

    componentDidMount() {
        apolloClient
            .query({
                query: gql`${CATEGORY_QUERY}`, variables: { id: this.props.id }
            })
            .then((res) => (this.setState({ product: res.data.product })))
            .catch(err => console.warn(err))
    }

    handleChangethumbnail(increment) {
        const quantityOfThumbnails = this.state?.product?.gallery?.length

        if (increment && quantityOfThumbnails > this.state.thumbnailsId + 1) {

            this.setState({ thumbnailsId: this.state.thumbnailsId + 1 })
        }

        if (increment === false && this.state.thumbnailsId > 0) {
            this.setState({ thumbnailsId: this.state.thumbnailsId - 1 })
        }
    }


    render() {

        const { currencyIndex, quantity, choosenAttributes } = this.props

        const { gallery, brand, name, prices, attributes } = this.state.product

        const { thumbnailsId } = this.state

        return (
            <article className={`product`}>
                <div className={`product__details`}>
                    <h3 className={`product__details__brand`}>{brand}</h3>
                    <h4 className={`product__details__name`}>{name}</h4>
                    <p className={`product__details__price`}>{prices?.[currencyIndex]?.currency.symbol}{prices?.[currencyIndex]?.amount}</p>
                    {showAttributes(attributes, choosenAttributes)}
                </div>
                <div className={`product__div`}>
                    <div className={`product__div__increase-amount`}>
                        <button className={`product__div__increase-amount__btn`}>+</button>
                        <p className={`product__div__increase-amount__product-amount`}>{quantity}</p>
                        <button className={`product__div__increase-amount__btn`}>-</button>
                    </div>
                    <div className={`product__div__div-img`}>
                        <img src={gallery?.[thumbnailsId]} alt="" className={`product__div__div-img__img`} />
                        <div className={`product__div__div-img__img-switch`} style={({ display: `${gallery?.length === 1 ? 'none' : 'block'}` })} >
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
    currencyIndex: state.category.chosenCurrencies
})

export default connect(mapStateToPrps)(ProductRow);