import Dashboard from './components/dashboard.jsx';
import Home from './components/home.jsx';
import Main from './components/main.jsx';
//import RegisterForm from './components/register.jsx';
//import LoginForm from './components/login.jsx';
import React from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

const routes = (<Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="/" component={Home}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Route>
  </Router>)

render(routes, document.getElementById('app'));
