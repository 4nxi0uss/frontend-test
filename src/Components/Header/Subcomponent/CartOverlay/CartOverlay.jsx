import React, { Component } from 'react';

import './CartOverlay.scss'

import cartImg from '../../../../img/cart-empty.svg'
import Modal from '../../../Modal/Modal';
import ProductRow from '../../../Cart/Subcomponent/ProductRow/ProductRow';

class CartOverlay extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        cartFlag: false,
        porductlist: []
    }

    componentDidMount() {
        try {
            this.setState({ porductlist: JSON.parse(localStorage.getItem('products')) })
        } catch (error) {

        }
    }
    render() {
        const { cartFlag, porductlist } = this.state
        console.log(cartFlag)
        console.log(porductlist)

        const prod = porductlist.map(({ id, attributes, prices, quantity }) => <ProductRow id={id} attributes={attributes} quantity={quantity} />)

        return (
            <>
                <div className={`cart-icon`}>
                    <img src={cartImg} alt="" className={`cart-icon__img`} onClick={() => { this.setState({ cartFlag: !cartFlag }) }} />
                </div>
                <Modal isOpen={cartFlag} >
                    <p>My bag, <span>3 items</span></p>
                    {prod}
                    <div><p>Total</p> <p>200</p></div>
                    <button>view bag</button>
                    <button>check out</button>
                </Modal>
            </>
        );
    }
}

export default CartOverlay;