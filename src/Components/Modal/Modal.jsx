import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DimmingBg from './DimmingBg/DimmingBg';

import './Modal.scss'

class Modal extends Component {

    render() {
        const { children, isOpen, createRef } = this.props

        if (!isOpen) return null
        return ReactDOM?.createPortal((
            <>
                <DimmingBg />

                <dialog className={`cart-overlay`} ref={createRef()} open={isOpen} >
                    {children}
                </dialog>
            </>
        ), document.querySelector('#root'));
    }
}

export default Modal;