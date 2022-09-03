import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss'

import { apolloClient } from '../../Apollo/apolloClient';
import { gql } from '@apollo/client';

import { connect } from 'react-redux';
import { changingCategory } from './headerSlice';

import Logo from '../../img/logo-header.svg'

import CurrencyMenu from './Subcomponent/CurrencyMenu/CurrencyMenu';
import CartOverlay from './Subcomponent/CartOverlay/CartOverlay';

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

        const { categories } = this.state

        const handleCategory = (e) => {
            this.props.changingCategory(e.target.innerHTML.trim())
        }

        const headerCategorires = categories?.map(({ name }) => (<NavLink className={`NavLink ${this.props.ChoosenCategory === name && 'NavLink--active'}`} key={name} onClick={handleCategory} to={'/'}>{name}</NavLink>))

        return (
            <>
                <header className='header'>
                    <ul className='header__nav'>
                        {headerCategorires}
                    </ul>
                    <NavLink to={'/'}> <img src={Logo} alt="header logo" className='header__logo' /></NavLink>
                    <div className='header__action'>
                        <CurrencyMenu />
                        <CartOverlay />
                    </div>
                </header>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    ChoosenCategory: state.category.category
})


export default connect(mapStateToProps, { changingCategory })(Header);