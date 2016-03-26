import React from 'react';
import { Link } from 'react-router';
import { Nav as Navigation } from 'react-bootstrap';
import {stateConnector} from '../../helpers/redux'

const active = 'active';
class Links extends React.Component {
  render(){
    let path = this.props.routing.location.pathname;

    let pathMatch = function(match){
      return (path == `/${match}`) || (path.indexOf(match) == 1);
    }

    return (
      <Navigation>
        <li className={pathMatch('dashboard') ? active : ''} role="presentation">
          <Link to="/dashboard">Dashboard</Link>
       </li>
      </Navigation>
    );
  }
}

export default stateConnector('auth', 'routing')(Links);
