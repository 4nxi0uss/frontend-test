import React, { Component } from 'react';

import './MainContent.scss'

import CategoryPage from '../CategoryPage/CategoryPage';

class MainContent extends Component {

    render() {
        return (<main className='main-content'>
            <CategoryPage />
        </main>);
    }
}

export default MainContent;