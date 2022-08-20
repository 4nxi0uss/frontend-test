import React, { Component } from 'react';

import Logo from '../../img/logo-header.svg'
import Cart from '../../img/cart-empty.svg'
import ArrowDown from '../../img/arrow-down.svg'

import './Header.scss'

import { client, Field, Query } from '@tilework/opus'

class Header extends Component {
    state = {
        categories: [],
        choosenCategories: ''
    }

    componentDidMount() {
        client.post(new Query(`categories`).addField(new Field('name'))).then((res) => (this.setState({ categories: res.categories })))
    }

    render() {

        const headerCategorires = this.state.categories.map(({ name }) => (<li key={name}>{name}</li>))

        return (
            <header className='header'>
                <ul className='header__nav'>
                    {headerCategorires}
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