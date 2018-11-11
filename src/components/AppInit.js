import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../App.css';
import Header from './Header';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DaftarMenu from './DaftarMenu';
import MenuDetails from './MenuDetails';
import SearchPage from './SearchPage';
import Footer from './Footer';
import CartPage from './CartPage';
import AdminProduct from './AdminProduct';
import AdminTrans from './AdminTransHistory';
import Profile from './Profile';

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
          <Route path="/adminproduct" component={AdminProduct} />
          <Route path="/admintransaction" component={AdminTrans} />
          <Route path='/search' component={SearchPage} />
          <Route path='/profile' component={Profile} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default AppInit;
