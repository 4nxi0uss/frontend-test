import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss'

class Modal extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {}
    render() {
        const { children, isOpen } = this.props

        if (!isOpen) return null
        console.log(document.querySelector('main'))

        return ReactDOM?.createPortal((
            <>
                <div className='test' />
                <dialog className={`cart-overlay`} open={isOpen} >
                    {children}
                </dialog>
            </>
        ), document.querySelector('main'));
    }
}

export default Modal;