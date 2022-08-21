import React, { Component } from 'react';

import './App.scss';

import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Header />
        <MainContent />
      </div>
    );
  }
}

export default App;
