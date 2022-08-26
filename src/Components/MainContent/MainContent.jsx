import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import './MainContent.scss'

import CategoryPage from '../CategoryPage/CategoryPage';
import ProductPage from '../ProductPage/ProductPage';
import Cart from '../Cart/Cart';

class MainContent extends Component {

    render() {
        return (<main className='main-content'>
            <Routes>
                <Route path='/' element={<CategoryPage />} />
                <Route path='/product-page' element={<ProductPage />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
        </main>);
    }
}

export default MainContent;