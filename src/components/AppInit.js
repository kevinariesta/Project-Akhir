import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../App.css';
import Header from './Header';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DaftarMenu from './DaftarMenu';
import MenuDetails from './MenuDetails';
import Footer from './Footer';
import CartPage from './CartPage';

class AppInit extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/daftarmenu" component={DaftarMenu} />
          <Route path="/menudetails" component={MenuDetails} />
          <Route path="/cart" component={CartPage} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default AppInit;
