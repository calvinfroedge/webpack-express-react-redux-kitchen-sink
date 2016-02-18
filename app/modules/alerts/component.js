import React from 'react';
import { connect } from 'react-redux';
import Notifier from 'react-bs-notifier';
import {dismissAlert} from './action';

class Alerts extends React.Component {
  constructor(props){
    super(props);
  }

  dismiss(item){
    this.props.dispatch(dismissAlert(item))
  }

  render() {
    let alerts = this.props.alerts || [];

    return (
      <Notifier alerts={alerts} onDismiss={this.dismiss.bind(this)} />   
    );
  }
}

function mapState(state){
  const { alerts } = state;

  return { alerts };
}

export default connect(mapState)(Alerts);
