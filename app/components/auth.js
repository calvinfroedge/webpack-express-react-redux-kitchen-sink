import React from 'react';
import { connect } from 'react-redux';

//Authentication
import {requestAuth, logout} from '../actions/auth';

class Auth extends React.Component {
  login(){
    const { dispatch } = this.props;
    dispatch(requestAuth())
  }

  logout(){
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    const { auth } = this.props;
    console.log('is auth?', auth.authenticated);
    return (
      <div>
        {auth.authenticated ? 
          <a href="#" onClick={this.logout.bind(this)}>Logout</a> :
          <a href="#" onClick={this.login.bind(this)}>Login</a>
        }
        <p>Authenticating: {auth.authenticating ? 'true' : 'false'}</p>
       
      </div>
    );
  }
}

function mapState(state){
  const { auth } = state;

  return {auth};
}

export default connect(mapState)(Auth);
