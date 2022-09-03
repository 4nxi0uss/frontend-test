import React, { Component } from 'react';

import './Cart.scss'

import ProductRow from './Subcomponent/ProductRow/ProductRow';

import { connect } from 'react-redux';
import { changingCategory } from '../Header/headerSlice';

import { gql } from '@apollo/client';
import { apolloClient } from '../../Apollo/apolloClient';

import { getTax, getTotalCost, getTotalQuantity } from '../../Utilities/Utilities';

class Cart extends Component {
    state = {
        currencies: []
    }

    componentDidMount() {

        this.props.changingCategory('')

        apolloClient
            .query({
                query: gql`{ currencies{label symbol}}`
            })
            .then((res) => (
                this.setState({ currencies: res.data.currencies })
            ))
            .catch(err => console.warn(err))
    }

    render() {

        const { currencyIndex, productList } = this.props

        const products = productList?.map(({ id, attributes, quantity }, index) => <ProductRow key={JSON.stringify(attributes)} id={id} choosenAttributes={attributes} index={index} quantity={quantity} />)

        return (
            <section className={`cart`}>
                <h2 className={`cart__title`}>Cart</h2>

                {products}

                <div className={`cart__summary`}>
                    <p className={`cart__summary__tax`}>tax 21%: <span className={`cart__summary__tax__amount`}>{this.state?.currencies?.[this.props.currencyIndex]?.symbol}{getTax(getTotalCost(productList, currencyIndex))}</span></p>
                    <p className={`cart__summary__quantity`}>Quantity: <span className={`cart__summary__quantity__amount`}>{getTotalQuantity(productList)}</span></p>
                    <p className={`cart__summary__total`}>Total: <span className={`cart__summary__total__amount`}>{this.state?.currencies?.[this.props.currencyIndex]?.symbol}{getTotalCost(productList, currencyIndex)}</span></p>
                    <button className={`cart__summary__order-btn`}>order</button>
                </div>
            </section>
        );
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies,
    productList: state.product.productList
})

export default connect(mapStateToPrps, { changingCategory })(Cart);