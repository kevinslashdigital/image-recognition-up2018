import './App.css';

import * as React from 'react';

import { Navigation } from '../components/Navigation';
import { HomePage } from '../containers/HomePage';
// import { ProductPage } from '../containers/ProductPage';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    const url = window.location.pathname;
    // tslint:disable-next-line:no-console
    console.log(url);
    return <div className="App">
        {/* <div>
          {url === '/' && <HomePage />}
          {url === '/home' && <HomePage />}
          {url === '/product' && <ProductPage />}
        </div> */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <div className="wrapper">
          <Navigation />
          <HomePage />
          {/* <div className="page-wrapper">
            <HomePage />
          </div> */}
        </div>
      </div>;
  }
}

export default App;
