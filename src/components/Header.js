import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actioncreators';

class Header extends Component {
  onLogOutClick = () => {
    this.props.onLogout();
  }

  renderNavbar = () => {
    if(this.props.auth.username != "") {
        return(
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
                  Menu
                </NavItem>
                <NavItem eventKey={2} id="textNav">
                  Penawaran Menarik
                </NavItem>
                <NavDropdown eventKey={3} title="Bantuan" id="textNav">
                  <MenuItem eventKey={3.1} id="textDropdown">Tentang Kami</MenuItem>
                  <MenuItem eventKey={3.2} id="textDropdown">Lokasi Kami</MenuItem>
                  <MenuItem eventKey={3.3} id="textDropdown">Hubungi Kami</MenuItem>
                  <MenuItem divider style={{ "background-color": "black" }} />
                  <MenuItem eventKey={3.3} id="textDropdown">Syarat dan Ketentuan</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavDropdown eventKey={4} title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
                  <MenuItem eventKey={4.1}>Profile</MenuItem>
                  <MenuItem eventKey={4.2}>Settings</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={4.3} onSelect={this.onLogOutClick}>Log Out</MenuItem>
                </NavDropdown>
              </Nav>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl type="text" placeholder="Cari" />
                </FormGroup>{" "}
                <input type="button" value="Enter" />
              </Navbar.Form>
            </Navbar.Collapse>
          </Navbar>
        );
    }
    return(
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
              Menu
            </NavItem>
            <NavItem eventKey={2} id="textNav">
              Penawaran Menarik
            </NavItem>
            <NavDropdown eventKey={3} title="Bantuan" id="textNav">
              <MenuItem eventKey={3.1} id="textDropdown">Tentang Kami</MenuItem>
              <MenuItem eventKey={3.2} id="textDropdown">Lokasi Kami</MenuItem>
              <MenuItem eventKey={3.3} id="textDropdown">Hubungi Kami</MenuItem>
              <MenuItem divider style={{ "background-color": "black" }} />
              <MenuItem eventKey={3.3} id="textDropdown">Syarat dan Ketentuan</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} id="textNav">
              <Link to="/login">Login</Link>
            </NavItem>
            <NavItem eventKey={2} id="textNav">
              <Link to="/register">Register</Link>
            </NavItem>
          </Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Cari" />
            </FormGroup>{" "}
            <input type="button" value="Enter" />
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

export default connect(mapStatetoProps, { onLogout })(Header);
