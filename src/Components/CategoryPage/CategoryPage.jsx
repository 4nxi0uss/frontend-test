import React, { Component } from 'react';
import { connect } from 'react-redux';

import { apolloClient } from '../../Apollo/apolloClient';
import { gql } from '@apollo/client';
import { CATEGORY_PRODUCT_QUERY } from '../../Apollo/querries';

import './CategoryPage.scss';

import ProductCard from './Subcomponent/ProductCard/ProductCard';

class CategoryPage extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        apolloClient
            .query({
                query: gql`${CATEGORY_PRODUCT_QUERY}`, variables: { "category": this.props.ChoosenCategory }
            })
            .then((res) => (
                this.setState({ products: res?.data.category.products })))
            .catch(err => console.warn(err))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ChoosenCategory === this.props.ChoosenCategory) return null
        apolloClient
            .query({
                query: gql`${CATEGORY_PRODUCT_QUERY}`, variables: { "category": this.props.ChoosenCategory }
            })
            .then((res) => (this.setState({ products: res.data.category.products })))
            .catch(err => console.warn(err))
    }

    render() {

        const { products } = this.state
        const { ChoosenCategory } = this.props

        const productCards = products.map(({ name, brand, inStock, gallery, id, prices, attributes }) => (
            <ProductCard key={id} inStock={inStock} id={id} name={name} brand={brand} gallery={gallery} prices={prices} attributes={attributes} />
        ))

        return (<section className='category-page'>
            <h1 className='category-page__title'>{ChoosenCategory}</h1>
            <div className='category-page__products'>
                {productCards}
            </div>
        </section>);
    }
}

const mapStateToProps = (state) => ({
    ChoosenCategory: state.category.category
})

export default connect(mapStateToProps)(CategoryPage);