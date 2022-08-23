import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { createElement } from 'react';
import { connect } from 'react-redux';
import { apolloClient } from '../../Apollo/client';

import './ProductPage.scss'

const CATEGORY_QUERY = `query getProducts($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
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
        currency{
  label
  symbol
  }
        amount
      }
      brand
    }
  }  
  `

class ProductPage extends Component {

    state = {
        product: {},
        choosenthumbnail: 0
    }
    // "xbox-series-s"
    // "ps-5"
    componentDidMount() {
        apolloClient
            .query({
                query: gql`${CATEGORY_QUERY}`, variables: { "id": "ps-5" }
            })
            .then((res) => (this.setState({ product: res.data.product })))
            .catch(err => console.warn(err))
    }

    render() {
        const { gallery, brand, name, inStock, description, prices, attributes, id } = this.state.product

        const { choosenthumbnail } = this.state

        const { currencyIndex } = this.props

        const showAttributes = () => {
            return attributes?.map(({ name, id, items, type }) => {
                return <div className='attributes'>
                    <p className='attributes__name'>{name}:</p><br />
                    <div className='attributes__div'>
                        {items?.map(({ displayValue, id, value }) => (<div key={id} className={type === "swatch" ? `attributes__div__swatch` : `attributes__div__text`} style={{ 'backgroundColor': `${value}` }}>{type === "swatch" ? "" : displayValue}</div>))}
                    </div>
                </div>
            })
        }

        // console.log(description)
        console.log(attributes)
        // console.log(prices)
        // console.log(gallery?.[0])

        const thumbnails = gallery?.map((el, index) => <img className={`product-page__thumbnails__thumbnails-img`} key={el} src={el} alt="" onClick={() => this.setState({ choosenthumbnail: index })} />)

        return (<section className={`product-page`}>
            <div className={`product-page__thumbnails`}>
                {thumbnails}
            </div>
            <div className={`product-page__img-div`}>
                <img className={`product-page__img-div__main-img`} src={gallery?.[choosenthumbnail]} alt="" />
            </div>

            <div className={`product-page__text`}>
                <h2 className={`product-page__text__brand`}>{brand}</h2>
                <h3 className={`product-page__text__name`}>{name}</h3>

                {showAttributes()}

                <p className={`product-page__text__price`}>price</p>
                <p className={`product-page__text__amount`}>{prices?.[currencyIndex]?.currency.symbol} {prices?.[currencyIndex]?.amount}</p>

                <button className={`product-page__text__btn`}>add to cart</button>

                <div dangerouslySetInnerHTML={{ __html: description }}></div>

            </div>

        </section>);
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies
})

export default connect(mapStateToPrps)(ProductPage);