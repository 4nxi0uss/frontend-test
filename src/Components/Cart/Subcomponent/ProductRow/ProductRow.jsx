import React, { Component } from 'react';

import './ProductRow.scss'

import img from '../../../../img/test-product.png'
// import arrow from '../../../img/arrow-down.svg'
import { showAttributes } from '../../../ProductPage/ProductPage';

const atr = [
    {
        "__typename": "AttributeSet",
        "id": "Size",
        "name": "Size",
        "type": "text",
        "items": [
            {
                "__typename": "Attribute",
                "displayValue": "40",
                "value": "40",
                "id": "40"
            },
            {
                "__typename": "Attribute",
                "displayValue": "41",
                "value": "41",
                "id": "41"
            },
            {
                "__typename": "Attribute",
                "displayValue": "42",
                "value": "42",
                "id": "42"
            },
            {
                "__typename": "Attribute",
                "displayValue": "43",
                "value": "43",
                "id": "43"
            }
        ]
    }
]
const chr = {
    "Size": "41"
}

class ProductRow extends Component {
    state = {}
    render() {
        return (
            <article className={`product`}>
                <div className={`product__details`}>
                    <h3 className={`product__details__brand`}>Apollo</h3>
                    <h4 className={`product__details__name`}>Running Short</h4>
                    <p className={`product__details__price`}>$50.00</p>
                    {showAttributes(atr, chr)}
                </div>
                <div className={`product__div`}>
                    <div className={`product__div__increase-amount`}>
                        <button className={`product__div__increase-amount__btn`}>+</button>
                        <p className={`product__div__increase-amount__product-amount`}>2</p>
                        <button className={`product__div__increase-amount__btn`}>-</button>
                    </div>
                    <div className={`product__div__div-img`}>
                        <img src={img} alt="" className={`product__div__div-img__img`} />
                        <div className={`product__div__div-img__img-switch`}>
                            <button className={`product__div__div-img__img-switch__btn`}>{`<`}</button>
                            <button className={`product__div__div-img__img-switch__btn`}>{`>`}</button>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default ProductRow;