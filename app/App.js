import React from 'react';
import styles from './App.css';

//Redux, React Router
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//Components
import Dashboard from './components/dashboard';
import OtherPanel from './components/panel';
import DndGrid from './components/dndgrid';
import Wrapper from './components/wrapper';
import Containers from './components/containers';
import {Alerts} from './modules/alerts';

//Import dev tools, store
import {DevTools, store} from './ReduxStore';

//Check existing auth
import {checkExistingAuth, authRedirect} from './actions/auth';
store.dispatch(checkExistingAuth());

//Auth Helpers
import {checkAuthForward, stateAuthReactor} from './helpers/auth';

//React to changes
store.subscribe(()=>{
  stateAuthReactor(store);
});

//Create the app container and routing plan
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={Wrapper} onEnter={checkAuthForward.bind(null, store)}>
            <Route path="/dashboard" component={Dashboard} />        
            <Route path="/dnd-grid" component={DndGrid} />
            <Route path="/containers" component={Containers} />
          </Route>
        </Router>
        <DevTools />
        <Alerts />
      </div>
    </Provider>
    );
  }
}
