import React, { Component } from 'react';

import './CategoryPage.scss'

import ProductCard from './Subcomponent/ProductCard/ProductCard';

class CategoryPage extends Component {

    render() {
        return (<section className='category-page'>
            <h1 className='category-page__title'>Category name</h1>
            <div className='category-page__products'>
                <ProductCard inStock={true} />
                <ProductCard inStock={false} />
                <ProductCard inStock={true} />
                <ProductCard inStock={true} />
            </div>
        </section>);
    }
}

export default CategoryPage;