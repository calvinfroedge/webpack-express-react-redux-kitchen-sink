import React from 'react';

//Redux DevTools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//React-Router
import { browserHistory } from 'react-router';

//Redux
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'react-router-redux';

//Reducers
import * as reducers from './reducers/index';

//Set up Redux Middleware
const historyMiddleware = syncHistory(browserHistory)
const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
})

//Set up Dev Tools
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

//Create the store
const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware, historyMiddleware),
  DevTools.instrument()
)(createStore);

const store = finalCreateStore(reducer);

//Listen for replays from browser history on data store
historyMiddleware.listenForReplays(store);

//Exports
export default store;
export {DevTools, store}
