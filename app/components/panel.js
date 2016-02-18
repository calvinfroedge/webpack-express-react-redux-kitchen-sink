import React from 'react';
import { connect } from 'react-redux';

class Panel extends React.Component {
  render() {
    return (
      <div>
        panel
      </div>
    );
  }
}

function mapState(state){
  const { auth } = state;

  return {auth};
}

export default connect(mapState)(Panel);
