import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onRegister } from '../actioncreators';
import '../supports/css/components/loginpage.css';

class RegisterPage extends Component {
    
  onRegisterClick = () => {
    var username = this.refs.username.value;
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    this.props.onRegister({ username, email, password })
  };

  render() {
    if(this.props.auth.username === "") {
      return (
          <div className="login-background">
              <div className="container">
                      <div className="login-form">
                      <div className="main-div">
                  <div className="panel">
                    <h1 className="form-heading">Register Page</h1>
                    <p>Please Register to Order Our Menu</p>
                  </div>

              <form id="Login">

                  <div className="form-group">
                      <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username"/>
                  </div>
                  <div className="form-group">
                      <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email Address"/>
                  </div>
                  <div className="form-group">
                      <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password"/>
                  </div>

                  <input type="button" className="btn btn-primary" value="Register" onClick={this.onRegisterClick} />

              </form>

                  </div>
                      <p className="botto-text"> Designed by Kevin Ariesta</p>
                  </div>
              </div>
          </div>
          );
        }
        return <Redirect to="/" />
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return { auth };
};

export default connect( mapStateToProps, { onRegister })(RegisterPage);
