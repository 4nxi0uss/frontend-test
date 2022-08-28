import React, { Component } from 'react';

import './Cart.scss'

import ProductRow from './Subcomponent/ProductRow/ProductRow';

import { connect } from 'react-redux';

import { gql } from '@apollo/client';
import { apolloClient } from '../../Apollo/client';

let products;

class Cart extends Component {

    state = {
        product: {},
        totalQuantity: 0,
        totalCost: 0,
        prices: []
    }

    componentDidMount() {
        let cost = 0;
        let productQuantity = 0;

        try {
            const productAddedToCartList = JSON.parse(localStorage.getItem('products'))

            products = productAddedToCartList?.map(({ id, attributes, quantity }) => <ProductRow key={JSON.stringify(attributes)} id={id} choosenAttributes={attributes} quantity={quantity} />)

            productAddedToCartList?.forEach(({ quantity, prices }) => {
                productQuantity += quantity;
                cost += prices?.[this.props.currencyIndex]?.amount;

            });
            this.setState({ totalQuantity: productQuantity })
            this.setState({ totalCost: cost })
        } catch (error) {
            console.warn(error)
        }

        apolloClient
            .query({
                query: gql`{ currencies{label symbol}}`
            })
            .then((res) => (
                this.setState({ prices: res.data.currencies })
            ))
            .catch(err => console.warn(err))
    }

    componentDidUpdate(prevProps, prevState) {
        let cost = 0;
        let productQuantity = 0;

        if (prevProps.currencyIndex === this.props.currencyIndex) return null

        try {
            const productAddedToCartList = JSON.parse(localStorage.getItem('products'))

            productAddedToCartList?.forEach(({ quantity, prices }) => {
                if (prevState.totalQuantity !== this.state.totalQuantity) {
                    productQuantity += quantity;
                }
                if (prevProps.currencyIndex !== this.props.currencyIndex) {
                    cost += prices?.[this.props.currencyIndex]?.amount;
                }
            })
            this.setState({ totalQuantity: productQuantity })
            this.setState({ totalCost: cost })
        } catch (error) {
            console.warn(error)
        }

    }

    render() {

        const getTax = (money) => (
            ((money / 100) * 21).toFixed(2)
        )

        const { totalCost, totalQuantity } = this.state

        return (
            <section className={`cart`}>
                <h2 className={`cart__title`}>Cart</h2>

                {products}

                <div className={`cart__summary`}>
                    <p className={`cart__summary__tax`}>tax 21%: <span>{getTax(totalCost)}</span></p>
                    <p className={`cart__summary__quantity`}>Quantity: <span>{totalQuantity}</span></p>
                    <p className={`cart__summary__total`}>Total: <span>{this.state?.prices?.[this.props.currencyIndex]?.symbol}{totalCost?.toFixed(2)}</span></p>
                    <button className={`cart__summary__order-btn`}>order</button>
                </div>
            </section>
        );
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies
})

export default connect(mapStateToPrps)(Cart);