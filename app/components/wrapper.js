import React from 'react'
import Nav from './nav/'
import {stateConnector} from '../helpers/redux'

export default class Wrapper extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default stateConnector()(Wrapper);
