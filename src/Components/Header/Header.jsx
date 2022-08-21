import React, { Component } from 'react';

import './Header.scss'

import { apolloClient } from '../../Apollo/client';
import { gql } from '@apollo/client';

import { connect } from 'react-redux';

import { changingCategory } from './headerSlice';

import Logo from '../../img/logo-header.svg'
import Cart from '../../img/cart-empty.svg'
import ArrowDown from '../../img/arrow-down.svg'

class Header extends Component {
    state = {
        categories: [],
        currencies: [],
    }

    componentDidMount() {
        apolloClient.query({ query: gql`{categories {name}}` }).then((res) => (this.setState({ categories: res.data.categories })))
        apolloClient.query({ query: gql`{currencies{label symbol}}` }).then((res) => (this.setState({ currencies: res.data.currencies })))
    }

    render() {
        const handleCategory = (e) => {
            this.props.changingCategory(e.target.innerHTML)
        }

        const headerCategorires = this.state.categories.map(({ name }) => (<li key={name} onClick={handleCategory}>{name}</li>))
        const currenc = this.state.currencies.map(({ label, symbol }) => <option value={label}>{symbol} {label}</option>)
        return (
            <header className='header'>
                <ul className='header__nav'>
                    {headerCategorires}
                </ul>
                <img src={Logo} alt="header logo" className='header__logo' />
                <div className='header__action'>
                    <select name="curr" id="cur">
                        {currenc}
                    </select>
                    <img src={Cart} alt="empty cart" className='header__action--cart' />
                </div>

            </header>
        );
    }
}

const mapStateToPrps = (state) => ({
    choosenCategories: state.category.category
})

export default connect(mapStateToPrps, { changingCategory })(Header);