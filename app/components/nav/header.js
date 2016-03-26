import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

class NavHeader extends React.Component {
  render(){
    let {props} = this;

    return (
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">{props.brand}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    )
  }
}

NavHeader.defaultProps = {
  brand: 'Brand'
}

export default NavHeader;
