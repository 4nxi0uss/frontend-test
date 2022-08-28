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

export const showAttributes = (attributes, choosenAttributes, handleChooseAtribiute) => (attributes?.map(({ name, id, items, type }) => (
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

class ProductPage extends Component {
    constructor(props) {
        super(props)

        this.handleAddProductToCart = this.handleAddProductToCart.bind(this)
    }

    state = {
        product: {},
        choosenthumbnail: 0,
        choosenAttributes: {},
        search: ''
    }

    componentDidMount() {
        try {

            apolloClient
                .query({
                    query: gql`${CATEGORY_QUERY}`, variables: { "id": localStorage.getItem('cart') }
                    // query: gql`${CATEGORY_QUERY}`, variables: { "id": this.props.cartId !== '' ? this.props.cartId : this.state.search }
                })
                .then((res) => (this.setState({ product: res.data.product })))
                .catch(err => console.warn(err))

            let par = ((new URL(document.location)).searchParams)
            this.setState({ search: par.get('id') })
        } catch (error) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.search === this.state.search) return null

        apolloClient
            .query({
                query: gql`${CATEGORY_QUERY}`, variables: { "id": localStorage.getItem('cart') }
                // query: gql`${CATEGORY_QUERY}`, variables: { "id": this.props.cartId !== '' ? this.props.cartId : this.state.search }
            })
            .then((res) => (this.setState({ product: res.data.product })))
            .catch(err => console.warn(err))

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

    handleAddProductToCart() {
        try {
            const tes = JSON.parse(localStorage.getItem('products')) ?? ''

            const isAttribiuteEquale = !!tes && tes.find(el => el.id === this.state.search && JSON.stringify(el.attributes) === JSON.stringify(this.state.choosenAttributes));

            if (!!this.state.choosenAttributes && !isAttribiuteEquale) {
                localStorage.setItem('products', JSON.stringify([...tes, { id: this.state.search, attributes: this.state.choosenAttributes, quantity: 1, prices: this.state.product.prices }]))
            } else {
                const tess = tes.findIndex(el => el.id === this.state.search && JSON.stringify(el.attributes) === JSON.stringify(this.state.choosenAttributes))

                tes[tess] = { ...tes[tess], quantity: tes[tess].quantity += 1 }

                localStorage.setItem('products', JSON.stringify(tes))
            }
        } catch (error) {
            console.warn(error)
        }
    }



    render() {

        const { gallery, brand, name, inStock, description, prices, attributes } = this.state.product
        const { choosenthumbnail, choosenAttributes } = this.state
        // console.log(attributes)
        // console.log(1, choosenAttributes)

        const { currencyIndex/*, productList */ } = this.props

        const handleChooseAtribiute = (name, value) => {

            const stringObjSort = Object
                .entries({ ...choosenAttributes, [name]: value })
                .sort((a, b) => a[0].toLocaleLowerCase().localeCompare(b[0].toLocaleLowerCase()))

            this.setState({ choosenAttributes: Object.fromEntries(stringObjSort) })
        }

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

                {showAttributes(attributes, choosenAttributes, handleChooseAtribiute)}

                <p className={`product-page__text__price`}>price:</p>
                <p className={`product-page__text__amount`}>{prices?.[currencyIndex]?.currency.symbol}{prices?.[currencyIndex]?.amount}</p>

                <button disabled={!inStock} className={`product-page__text__btn`} onClick={this.handleAddProductToCart}>add to cart</button>

                <div className={`product-page__text__description`} dangerouslySetInnerHTML={{ __html: description }}></div>

            </div>

        </section>);
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies,
    cartId: state.cart.cartId,
    ProductList: state.product.productList
})

export default connect(mapStateToPrps)(ProductPage);