import React, { Component } from 'react';
import { Grid, Nav, NavItem, footer } from 'react-bootstrap';

class Footer extends Component{
  render(){
    return (
      <footer style={{ backgroundColor: "red", marginTop: '10px' }}>
        <Grid>
          <Nav>
            <NavItem
              eventKey={1}>
              Privacy policy
            </NavItem>
            <NavItem
              eventKey={2}
              title="Item">
              Terms & Conditions
            </NavItem>
            <NavItem
              eventKey={3}>
              Some other professional link
            </NavItem>
          </Nav>

          <div className="text-center small copyright">
            © RLM 2016
          </div>
        </Grid>
      </footer>
    );
  }
}

export default Footer;