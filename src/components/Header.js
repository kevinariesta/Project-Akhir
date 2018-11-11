import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout, keepLogin } from '../actioncreators';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Header extends Component {
  state = { searchValue: "" }
 
  componentWillMount() {
    const cookieNya = cookies.get('LoginWMM');
    if(cookieNya !== undefined){
      this.props.keepLogin(cookieNya);
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.auth.username === "") {
      cookies.remove('LoginWMM');
    }
  }

  onLogOutClick = () => {
    this.props.onLogout();
  }

  onSearchClick = async (value) => {
    console.log(value);

    // await this.setState({ searchValue: value });
    // console.log(this.state.searchValue);
    await this.props.history.push(`/search?value=${value}`);
    await console.log(this.props);
  }

  renderRightNavbar= () => {
    if(this.props.auth.username === "admin") {
      return (
        <Nav pullRight>
          <NavDropdown eventKey={4} title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
              <MenuItem eventKey={4.1}>
                <Link to="/adminproduct" id="navdrop">Menu List</Link>
              </MenuItem>
            <MenuItem eventKey={4.2}>
              <Link to="admintransaction" id="navdrop">
                Transaction History
              </Link>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={4.3} onSelect={this.onLogOutClick}>Log Out</MenuItem>
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
          <NavDropdown eventKey={4} title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
            <MenuItem eventKey={4.1}>Transaction History</MenuItem>
            <MenuItem eventKey={4.2}>Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={4.3} onSelect={this.onLogOutClick}>Log Out</MenuItem>
          </NavDropdown>
        </Nav>
      );
    }
    return(
      <Nav pullRight>
        <NavItem eventKey={1} id="textNav">
          <Link to="/login">Login</Link>
        </NavItem>
        <NavItem eventKey={2} id="textNav">
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
            <NavItem eventKey={1} id="textNav">
              <Link to="/daftarmenu">Menu</Link>
            </NavItem>
            <NavDropdown eventKey={3} title="Bantuan" id="textNav">
              <MenuItem eventKey={3.1} id="textDropdown">Tentang Kami</MenuItem>
              <MenuItem eventKey={3.2} id="textDropdown">Lokasi Kami</MenuItem>
              <MenuItem eventKey={3.3} id="textDropdown">Hubungi Kami</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} id="textDropdown">Syarat dan Ketentuan</MenuItem>
            </NavDropdown>
          </Nav>
            {this.renderRightNavbar()}
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Cari..." inputRef={input => this.search = input } />
            </FormGroup>{" "}
            {/* <Link to={`/search?value=${this.state.searchValue}`}> */}
              <input type="button" className="btn btn-default" value="Submit" onClick={() => this.onSearchClick(this.search.value)} />
            {/* </Link> */}
          </Navbar.Form>
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
