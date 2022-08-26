import React, { Component } from 'react';

import './Cart.scss'
import ProductRow from './Subcomponent/ProductRow/ProductRow';

class Cart extends Component {
    state = {}
    render() {

        return (
            <section className={`cart`}>
                <h2 className={`cart__title`}>Cart</h2>

                <ProductRow />
                <div className={`cart__summary`}>
                    <p className={`cart__summary__tax`}>tax 21%: <span></span></p>
                    <p className={`cart__summary__quantity`}>Quantity: <span></span></p>
                    <p className={`cart__summary__total`}>Total: <span></span></p>
                    <button className={`cart__summary__order-btn`}>order</button>
                </div>
            </section>
        );
    }
}

export default Cart;