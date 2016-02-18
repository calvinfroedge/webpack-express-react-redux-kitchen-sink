import React from 'react';
import { connect } from 'react-redux';
import {RPCWrapper} from '../modules/rpcwrapper';
import {DndGridContainer} from '../modules/dnd-dashboard';

class DndGrid extends React.Component {
  render() {
    return (
      <div>
        drag & drop grid
        <DndGridContainer />
      </div>
    );
  }
}

function mapState(state){
  const { auth } = state;

  return {auth};
}

export default connect(mapState)(DndGrid);
