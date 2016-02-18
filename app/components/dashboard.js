import React from 'react';
import { connect } from 'react-redux';
import {RPCWrapper} from '../modules/rpcwrapper';
import {store} from '../ReduxStore';
import DashboardItem from './dashboard_item';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        dashboard
        <RPCWrapper initialLoad={{resource: 'foo'}}>
          <DashboardItem />
        </RPCWrapper>
      </div>
    );
  }
}

function mapState(state){
  const { auth } = state;

  return {auth};
}

export default connect(mapState)(Dashboard);
