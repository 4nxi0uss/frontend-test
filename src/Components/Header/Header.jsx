import React, { Component } from 'react';

import './Header.scss'

import { apolloClient } from '../../Apollo/client';
import { gql } from '@apollo/client';

import { connect } from 'react-redux';
import { changingCategory } from './headerSlice';

import Logo from '../../img/logo-header.svg'
import Cart from '../../img/cart-empty.svg'

import CurrencyMenu from './Subcomponent/CurrencyMenu';

class Header extends Component {
    state = {
        categories: [],
    }

    componentDidMount() {
        apolloClient
            .query({ query: gql`{categories {name}}` })
            .then((res) => (this.setState({ categories: res.data.categories })))
            .catch(err => console.warn(err))
    }

    render() {

        const handleCategory = (e) => {
            this.props.changingCategory(e.target.innerHTML)
        }

        const headerCategorires = this.state.categories.map(({ name }) => (<li key={name} onClick={handleCategory}>{name}</li>))

        return (
            <>
                <header className='header'>
                    <ul className='header__nav'>
                        {headerCategorires}
                    </ul>
                    <img src={Logo} alt="header logo" className='header__logo' />
                    <div className='header__action'>
                        <CurrencyMenu />
                        <img src={Cart} alt="empty cart" className='header__action--cart' />
                    </div>
                </header>
            </>
        );
    }
}

export default connect(null, { changingCategory })(Header);