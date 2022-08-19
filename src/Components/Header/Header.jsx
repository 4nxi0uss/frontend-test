import React, { Component } from 'react';

import Logo from '../../img/logo-header.svg'
import Cart from '../../img/cart-empty.svg'
import ArrowDown from '../../img/arrow-down.svg'

import './Header.scss'

class Header extends Component {

    state = {}

    render() {
        return (
            <header className='header'>
                <ul className='header__nav'>
                    <li>WOMEN</li>
                    <li>MEN</li>
                    <li>KIDS</li>
                </ul>
                <img src={Logo} alt="header logo" className='header__logo' />
                <div className='header__action'>
                    <p className='header__action--currency'>PLN <img src={ArrowDown} alt="arrow down" /></p>
                    <img src={Cart} alt="empty cart" className='header__action--cart' />
                </div>

            </header>
        );
    }
}

export default Header;