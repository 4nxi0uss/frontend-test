import React, { Component } from 'react';

import './CurrencyMenu.scss'

import { gql } from '@apollo/client';
import { apolloClient } from '../../../Apollo/client';

import ArrowDown from '../../../img/arrow-down.svg'
import { connect } from 'react-redux';
import { changingCurrencies } from '../headerSlice';

class CurrencyMenu extends Component {
    state = {
        currencies: [],
        currencyFlag: false,
    }

    componentDidMount() {
        apolloClient
            .query({ query: gql`{currencies{label symbol}}` })
            .then((res) => (this.setState({ currencies: res.data.currencies })))
            .catch(err => console.warn(err))
    }

    render() {

        const { currencyIndex, changingCurrencies } = this.props

        const { currencies, currencyFlag } = this.state

        const handleChooseCurency = (index) => {
            changingCurrencies(index)
            this.setState({ currencyFlag: false })
        }

        const currencyList = currencies.map(({ label, symbol }, index) => <p key={label} onClick={() => { handleChooseCurency(index) }}>{symbol} {label}</p>)

        return (
            <>
                <div className={'currency-menu'} onClick={() => { this.setState({ currencyFlag: !currencyFlag }) }}>
                    <p className={`currency-menu__currency-symbol`}>{currencies[currencyIndex]?.symbol}</p>
                    <img src={ArrowDown} alt="" className={`currency-menu__currency-arrow`} />
                </div>
                {currencyFlag && <div className={`currency-list`}>
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