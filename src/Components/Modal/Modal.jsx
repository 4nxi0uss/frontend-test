import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss'

class Modal extends Component {

    render() {
        const { children, isOpen } = this.props

        if (!isOpen) return null

        return ReactDOM?.createPortal((
            <>
                <div className='dimming' />
                <dialog className={`cart-overlay`} open={isOpen} >
                    {children}
                </dialog>
            </>
        ), document.querySelector('main'));
    }
}

export default Modal;