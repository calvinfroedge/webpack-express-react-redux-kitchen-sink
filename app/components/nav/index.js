import React from 'react';
import { Link } from 'react-router';
import Links from './links';
import NavHeader from './header';
import { Navbar, NavDropdown, Nav as Navigation, MenuItem, NavItem } from 'react-bootstrap';
import {stateConnector} from '../../helpers/redux'

class Nav extends React.Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <NavHeader />
          <Navbar.Collapse>
            <Links />
            {this.props.children}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default stateConnector('auth', 'routing')(Nav);
