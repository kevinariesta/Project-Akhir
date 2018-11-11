import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout, keepLogin } from '../actioncreators';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Header extends Component {
  state = { userState: 1 }
 
  componentWillMount() {
    const cookieNya = cookies.get('LoginWMM');
    if(cookieNya !== undefined){
      this.props.keepLogin(cookieNya);
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.auth.username === "") {
      cookies.remove('LoginWMM');
      this.setState({ userState: 0 })
    }
    else if(newProps.auth.username !== "") {
      this.setState({ userState: 1 })
    }
  }

  onLogOutClick = () => {
    this.props.onLogout();
  }

  onSearchClick = (value) => {
    this.props.history.push(`/search?value=${value}`);
  }

  renderRightNavbar= () => {
    if(this.props.auth.username === "admin") {
      return (
        <Nav pullRight>
          <NavDropdown eventKey={4} title={"Hello, " + this.props.auth.username} id="textNav">
              <MenuItem eventKey={4.1}>
                <Link to="/adminproduct" id="navdrop">Menu List</Link>
              </MenuItem>
            <MenuItem eventKey={4.2}>
              <Link to="admintransaction" id="navdrop">
                Transaction History
              </Link>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={4.3} onSelect={this.onLogOutClick}>
              <Link to="/" id="navdrop">Log Out</Link>
            </MenuItem>
          </NavDropdown>
        </Nav>
      );
    }
    if(this.props.auth.username !== "" && this.props.auth.username !== "admin") {
      return(
        <Nav pullRight>
          <NavItem eventKey={5} id="textNav">
            <Link to={`/cart?username=${this.props.auth.username}`}>  
              <div className="icon-cart" style={{ float: "left"}}>
                <div className="cart-line-1" style={{ backgroundColor: "#E5E9EA"}}></div>
                <div className="cart-line-2" style={{ backgroundColor: "#E5E9EA"}}></div>
                <div className="cart-line-3" style={{ backgroundColor: "#E5E9EA"}}></div>
                <div className="cart-wheel" style={{ backgroundColor: "#E5E9EA"}}></div>
              </div>
              Cart
            </Link>
          </NavItem>
          <NavDropdown eventKey={4} title={"Hello, " + this.props.auth.username} id="textNav">
            <MenuItem eventKey={4.1}>Transaction History</MenuItem>
            <MenuItem eventKey={4.2}>
              <Link to={`/profile?username=${this.props.auth.username}`} id="navdrop">Profile</Link>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={4.3} onSelect={this.onLogOutClick}>
              <Link to="/" id="navdrop">Log Out</Link>
            </MenuItem>
          </NavDropdown>
        </Nav>
      );
    }
    return(
      <Nav pullRight>
        <NavItem eventKey={1} id="textNav" componentClass="span">
          <Link to="/login">Login</Link>
        </NavItem>
        <NavItem eventKey={2} id="textNav" componentClass="span">
          <Link to="/register">Register</Link>
        </NavItem>
      </Nav>
    );
  }

  renderNavbar = () => {
    return (
      <Navbar fixedTop={true} inverse collapseOnSelect id="navbarStyle">
        <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" id="textNav">Warung Melati Mas</Link>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} id="textNav" componentClass="span">
              <Link to="/daftarmenu">Menu</Link>
            </NavItem>
          </Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Cari..." inputRef={input => this.search = input } />
            </FormGroup>{" "}
              <input type="button" className="btn btn-default" value="Submit" onClick={() => this.onSearchClick(this.search.value)} />
          </Navbar.Form>
          {this.renderRightNavbar()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
    
  render() {
    return (
      this.renderNavbar() 
    );
  }
}

const mapStatetoProps = (state) => {
  const auth = state.auth;
  
  return { auth };
}

export default withRouter(connect(mapStatetoProps, { onLogout, keepLogin })(Header));
