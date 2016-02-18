import React from 'react';
import { connect } from 'react-redux';
import Auth from './auth';
import Nav from './nav';

export default class Wrapper extends React.Component {
  render() {
    const {authenticated} = this.props.auth;
    const {network_requests_in_progress} = this.props.network;

    return (
      <div>
        <Nav>
          <Auth />
        </Nav>
        <div className="container container-fluid">
        {
          authenticated ? 
          <div>
            {this.props.children}
          </div> 
          : ''
        }
        </div>
        {network_requests_in_progress.length > 0 ?
        <div style={{postion: 'absolute', left: 0, bottom: 0, display: 'inline-block'}}>
          Network call in progress...
        </div>
        : ''}
      </div>
    );
  }
}

function stateMap(state){
  const {auth, network} = state;

  return {auth, network};
}

export default connect(stateMap)(Wrapper);
