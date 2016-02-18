import { AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAIL, AUTH_TERMINATE, AUTH_REDIRECT } from '../constants'

const initialState = {
  authenticated: false,
  authenticating: false,
  redirecting: false
}

export default function auth(state = initialState, action) {
  if(action.type === AUTH_SUCCESS) {
    return Object.assign({}, state, {authenticated: true, authenticating: false});
  }
  else if(action.type === AUTH_REQUEST) {
    return Object.assign({}, state, {authenticating: true});
  }
  else if(action.type === AUTH_FAIL) {
    return Object.assign({}, state, {authenticating: false, authenticated: true});
  }
  else if(action.type === AUTH_TERMINATE) {
    return Object.assign({}, state, {authenticating: false, authenticated: false});
  }
  else if(action.type === AUTH_REDIRECT) {
    return Object.assign({}, state, {redirecting: true});
  }

  return state
}
