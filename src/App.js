import React, { Component } from 'react';

import './App.scss';

import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';
import { client } from '@tilework/opus'

class App extends Component {
  render() {
    client.setEndpoint("http://localhost:4000/")

    return (
      <div className="App">
        <Header />
        <MainContent />
      </div>
    );
  }
}

export default App;
