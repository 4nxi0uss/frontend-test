import React, { Component, createRef } from 'react';

import './CurrencyMenu.scss'

import { gql } from '@apollo/client';
import { apolloClient } from '../../../../Apollo/client';

import ArrowDown from '../../../../img/arrow-down.svg'
import { connect } from 'react-redux';
import { changingCurrencies } from '../../headerSlice';

class CurrencyMenu extends Component {
    constructor(props) {
        super(props);

        this.dropDownMenuRef = createRef()
        this.currencySymbolRef = createRef()
        this.handleOut = this.handleOut?.bind(this)
    }

    state = {
        currencies: [],
        currencyFlag: false,
    }

    componentDidMount() {
        apolloClient
            .query({ query: gql`{currencies{label symbol}}` })
            .then((res) => (this.setState({ currencies: res.data.currencies })))
            .catch(err => console.warn(err))

        document.addEventListener('mousedown', this.handleOut)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOut)
    }

    handleOut = (e) => {
        if (this.state.currencyFlag && !!this.dropDownMenuRef && !!this.currencySymbolRef && !this.dropDownMenuRef.current?.contains(e.target) && !this.currencySymbolRef.current?.contains(e.target)) { this.setState({ currencyFlag: false }) }
    }

    handleChooseCurency = (index) => {
        this.props.changingCurrencies(index)
        localStorage.setItem('currencieIndex', index)
        this.setState({ currencyFlag: false })
    }

    handleToogleMenu = () => {
        this.setState({ currencyFlag: !this.state.currencyFlag })
    }

    render() {

        const { handleChooseCurency, handleToogleMenu } = this

        const { currencyIndex } = this.props

        const { currencies, currencyFlag } = this.state

        const currencyList = currencies.map(({ label, symbol }, index) => <p key={label} onClick={() => { handleChooseCurency(index) }}>{symbol} {label}</p>)

        return (
            <>
                <div ref={this.currencySymbolRef} className={'currency-menu'} onClick={handleToogleMenu}>
                    <p className={`currency-menu__currency-symbol`}>{currencies[currencyIndex]?.symbol}</p>
                    <img src={ArrowDown} alt="" className={`currency-menu__currency-arrow`} />
                </div>
                {currencyFlag && <div ref={this.dropDownMenuRef} className={`currency-list`} >
                    {currencyList}
                </div>}
            </>
        );
    }
}

const mapStateToPrps = (state) => ({
    currencyIndex: state.category.chosenCurrencies
})

export default connect(mapStateToPrps, { changingCurrencies })(CurrencyMenu);