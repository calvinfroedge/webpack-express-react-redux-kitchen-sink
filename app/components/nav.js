import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, NavDropdown, Nav as Navigation, MenuItem, NavItem } from 'react-bootstrap';

const active = 'active';

class Nav extends React.Component {
  render() {
    let path = this.props.routing.location.pathname;

    let pathMatch = function(match){
      return (path == `/${match}`) || (path.indexOf(match) == 1);
    }

    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Brand</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navigation>
              <li className={pathMatch('dashboard') ? active : ''} role="presentation"><Link to="/dashboard">Dashboard</Link></li>
              <li className={pathMatch('dnd-grid') ? active : ''} role="presentation"><Link to="/dnd-grid">Drag and Drop Grid</Link></li>
              <li className={pathMatch('containers') ? active : ''} role="presentation"><Link to="/containers">Expand / Collapse / Fullscreen Containers</Link></li>
            </Navigation>
            {this.props.children}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapState(state){
  const { auth, routing } = state;

  return {auth, routing};
}

export default connect(mapState)(Nav);
