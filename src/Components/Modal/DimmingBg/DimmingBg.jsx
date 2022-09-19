import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './DimmingBg.scss'

class DimmingBg extends Component {
    state = {}
    render() {
        return (ReactDOM?.createPortal((
            <div className='dimming' />
        ), document.querySelector('#root')));
    }
}

export default DimmingBg;