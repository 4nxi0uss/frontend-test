import React, { Component } from 'react';
import { connect } from 'react-redux';

import { apolloClient } from '../../Apollo/client';
import { gql } from '@apollo/client';

import './CategoryPage.scss';

import ProductCard from './Subcomponent/ProductCard/ProductCard';

const CATEGORY_QUERY = `query getProducts($cat:String!) { category(input: { title: $cat }) {
      products {
        id name inStock gallery description category brand
          prices {
          currency {
            label symbol
          }
          amount
        }}}}`

class CategoryPage extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        apolloClient
            .query({
                query: gql`${CATEGORY_QUERY}`, variables: { "cat": this.props.ChoosenCategory }
            })
            .then((res) => (this.setState({ products: res.data.category.products })))
            .catch(err => console.warn(err))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ChoosenCategory === this.props.ChoosenCategory) return null
        apolloClient
            .query({
                query: gql`${CATEGORY_QUERY}`, variables: { "cat": this.props.ChoosenCategory }
            })
            .then((res) => (this.setState({ products: res.data.category.products })))
            .catch(err => console.warn(err))
    }

    render() {

        const products = this.state.products.map(({ name, brand, inStock, gallery, id, prices }) => (<ProductCard key={id} inStock={inStock} name={name} brand={brand} gallery={gallery} prices={prices} />))

        return (<section className='category-page'>
            <h1 className='category-page__title'>{this.props.ChoosenCategory}</h1>
            <div className='category-page__products'>
                {products}
            </div>
        </section>);
    }
}

const mapStateToProps = (state) => ({
    ChoosenCategory: state.category.category
})

export default connect(mapStateToProps)(CategoryPage);