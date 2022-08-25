import React, { Component } from 'react';

import './ProductPage.scss'

import { connect } from 'react-redux';

import { gql } from '@apollo/client';
import { apolloClient } from '../../Apollo/client';

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
        currency {
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
        choosenthumbnail: 0,
        choosenAttributes: {},
        search: ''

    }
    componentDidMount() {
        apolloClient
            .query({
                query: gql`${CATEGORY_QUERY}`, variables: { "id": this.props.cartId }
            })
            .then((res) => (this.setState({ product: res.data.product })))
            .catch(err => console.warn(err))

        let par = ((new URL(document.location)).searchParams)
        this.setState({ search: par.get('id') })
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevProps.search === this.state.search) return null

        let par = ((new URL(document.location)).searchParams)
        this.setState({ search: par.get('id') })
    }

    componentWillUnmount() {
        this.setState({
            product: {},
            choosenthumbnail: 0,
            choosenAttributes: {},
            search: ''
        })
    }

    render() {

        const { gallery, brand, name, inStock, description, prices, attributes } = this.state?.product

        const { choosenthumbnail, choosenAttributes } = this.state

        const { currencyIndex } = this.props

        const handleChooseAtribiute = (name, value) => {
            this.setState({ choosenAttributes: { ...choosenAttributes, [name]: value } })
        }

        const showAttributes = () => (attributes?.map(({ name, id, items, type }) => (
            <div key={id} className='attributes'>

                <p className='attributes__name'>{name}:</p>

                <ul className='attributes__div'>
                    {items?.map(({ displayValue, id, value }) => (
                        <li onClick={() => { handleChooseAtribiute(name, id) }} key={id} className={`attributes__div__${type} ${choosenAttributes[name] === id && "attributes__div__" + type + "--active"}`} style={{
                            'backgroundColor': `${value}`
                        }}>{type !== "swatch" && displayValue}</li>))}
                </ul>
            </div>)
        ))

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

                <p className={`product-page__text__price`}>price:</p>
                <p className={`product-page__text__amount`}>{prices?.[currencyIndex]?.currency.symbol}{prices?.[currencyIndex]?.amount}</p>

                <button className={`product-page__text__btn`}>add to cart</button>

                <div className={`product-page__text__description`} dangerouslySetInnerHTML={{ __html: description }}></div>

            </div>

        </section>);
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies,
    cartId: state.product.cartId
})

export default connect(mapStateToPrps)(ProductPage);