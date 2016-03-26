import React from 'react';
import { stateConnector } from '../helpers/redux'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        dashboard
      </div>
    );
  }
}

export default stateConnector()(Dashboard);
