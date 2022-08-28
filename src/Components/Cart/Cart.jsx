import React, { Component } from 'react';

import './Cart.scss'

import ProductRow from './Subcomponent/ProductRow/ProductRow';

import { connect } from 'react-redux';

import { gql } from '@apollo/client';
import { apolloClient } from '../../Apollo/client';
import { changingCategory } from '../Header/headerSlice';


class Cart extends Component {
    constructor(props) {
        super(props)

        this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    }

    state = {
        productList: [],
        prices: []
    }

    componentDidMount() {

        this.props.changingCategory('')

        try {
            this.setState({ productList: JSON.parse(localStorage.getItem('products')) })

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

    handleChangeQuantity(increment, index) {
        let temporary = this.state?.productList

        if (increment) {
            temporary[index] = { ...temporary?.[index], quantity: temporary?.[index]?.quantity + 1 }

            localStorage.setItem('products', JSON.stringify(temporary))
            this.setState({ productList: temporary })
        }

        if (increment === false && temporary?.[index].quantity > 0) {
            temporary[index] = { ...temporary?.[index], quantity: temporary?.[index]?.quantity - 1 }
            console.log('decrese')
            localStorage.setItem('products', JSON.stringify(temporary))
            this.setState({ productList: temporary })
        }

        if (increment === false && temporary?.[index].quantity === 0) {
            console.log('delete')
            localStorage.setItem('products', JSON.stringify(temporary.slice(0, index)))
            this.setState({ productList: temporary.slice(0, index) })
        }

    }

    render() {

        const { currencyIndex } = this.props
        const { productList } = this.state


        const products = productList?.map(({ id, attributes, quantity }, index) => <ProductRow key={JSON.stringify(attributes)} id={id} choosenAttributes={attributes} index={index} quantity={quantity} fun={this.handleChangeQuantity} />)

        const getTax = (money) => (
            ((money / 100) * 21).toFixed(2)
        )

        const getTotalQuantity = () => {
            let productQuantity = 0;
            productList.forEach(({ quantity }) => { productQuantity += quantity })
            return productQuantity
        }

        const getTotalCost = () => {
            let cost = 0;
            productList.forEach(({ prices, quantity }) => { cost += prices?.[currencyIndex].amount * quantity })
            return cost.toFixed(2)
        }

        return (
            <section className={`cart`}>
                <h2 className={`cart__title`}>Cart</h2>

                {products}

                <div className={`cart__summary`}>
                    <p className={`cart__summary__tax`}>tax 21%: <span className={`cart__summary__tax__amount`}>{this.state?.prices?.[this.props.currencyIndex]?.symbol}{getTax(getTotalCost())}</span></p>
                    <p className={`cart__summary__quantity`}>Quantity: <span className={`cart__summary__quantity__amount`}>{getTotalQuantity()}</span></p>
                    <p className={`cart__summary__total`}>Total: <span className={`cart__summary__total__amount`}>{this.state?.prices?.[this.props.currencyIndex]?.symbol}{getTotalCost()}</span></p>
                    <button className={`cart__summary__order-btn`}>order</button>
                </div>
            </section>
        );
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies
})

export default connect(mapStateToPrps, { changingCategory })(Cart);