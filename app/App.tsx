import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/Store/Store';

import Router from './src/Navigation/Navigation';

class App extends Component {

  componentDidMount = () => {
    StatusBar.setHidden(true);
    
  }

  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

export default App;
