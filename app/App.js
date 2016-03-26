import React from 'react';
import styles from './App.css';

//Redux, React Router
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//Components
import Dashboard from './components/dashboard';
import Wrapper from './components/wrapper';

//Import dev tools, store
import {DevTools, store} from './ReduxStore';

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
          <Route path="/" component={Wrapper}>
            <Route path="/dashboard" component={Dashboard} />        
          </Route>
        </Router>
        <DevTools />
      </div>
    </Provider>
    );
  }
}
