import { replace } from 'react-router-redux';
//Should route change? If so, return it.
export function routeShouldChange(loggedIn, atRoot){
  if(loggedIn && atRoot){
    return '/dashboard';
  } else if(!loggedIn && !atRoot){
    return '/';
  }

  return false;
}

//Authentication checks for router
export function checkAuthForward(store, nextState, replace){
  let nextRoute = routeShouldChange(
      store.getState().auth.authenticated, 
      nextState.location.pathname == '/'
  );

  if(nextRoute) replace(nextRoute);
}

//Figure out if redirection is necessary and dispatch if so
export function stateAuthReactor(store){
  let state = store.getState();
  let redirecting = state.auth.redirecting;

  let nextRoute = routeShouldChange(
    state.auth.authenticated,
    state.routing.location.pathname == '/'
  );

  if(!redirecting && nextRoute) store.dispatch(replace(nextRoute));
}
