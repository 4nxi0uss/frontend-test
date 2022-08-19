import React, { Component } from 'react';

import './App.scss';
import Header from './Components/Header/Header';

class App extends Component {
  state = {}
  render() {

    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
