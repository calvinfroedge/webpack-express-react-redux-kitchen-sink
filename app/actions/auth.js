import {AUTH_SUCCESS, AUTH_FAIL, AUTH_REQUEST, AUTH_TERMINATE} from '../constants';

const LS_PROFILE = 'profile';
const LS_TOKEN = 'id_token';

export function notifyAuthInProgress(){
  return {
    type: AUTH_REQUEST
  }
}

export function checkExistingAuth() {
  let profile = localStorage.getItem(LS_PROFILE);
  let token = localStorage.getItem(LS_TOKEN);

  if(profile && token){
    return dispatch => {
      dispatch(receiveAuth({id_token: token, profile}));
    }
  } else {
    return terminateAuth();
  }
}

export function requestAuth() {
  const lock = new Auth0Lock('jkGhNpM9SOtQkIn9hv8iq6wcg2lN7chz', 'calvin.auth0.com');


  return dispatch => {
    dispatch(notifyAuthInProgress());

    lock.show((err, profile, token) => {
      if(err){
        dispatch(authError(err));
      }

      localStorage.setItem(LS_PROFILE, JSON.stringify(profile));
      localStorage.setItem(LS_TOKEN, token);

      dispatch(receiveAuth({profile, id_token: token}));
    })
  }
}

export function receiveAuth(user) {
  return {
    type: AUTH_SUCCESS,
    id_token: user.id_token,
    profile: user.profile
  }
}

export function authError(message) {
  return {
    type: AUTH_FAILURE,
    message
  }
}

export function terminateAuth(){
  return {
    type: AUTH_TERMINATE
  }
}

export function logout(){
  return dispatch => {
    localStorage.removeItem(LS_PROFILE);
    localStorage.removeItem(LS_TOKEN);
    dispatch(terminateAuth());
  }
}

export function authRedirect(){
  return {
    type: AUTH_REDIRECT
  }
}
