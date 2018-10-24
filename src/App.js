import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import AppInit from './components/AppInit';
import { keepLogin, cookieChecked } from './actioncreators';

const cookies = new Cookies();

class App extends Component {
 
  componentWillMount() {
    const cookieNya = cookies.get('LoginWMM');
    if(cookieNya !== undefined) {
      this.props.keepLogin(cookieNya);
    }
    else {
      this.props.cookieChecked();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.auth.username === "" && (this.props.auth.username !== newProps.auth.username)) {
      cookies.remove('LoginWMM');
    }
    else if(newProps.auth.username !== "" && (this.props.auth.username !== newProps.auth.username)) {
      cookies.set('LoginWMM', newProps.auth.email, { path: '/' });
    }
  }

  render() {
    return (
      <AppInit />
    );
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));
