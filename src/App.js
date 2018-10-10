import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';




class App extends Component {
  componentDidMount(){
      console.log("i tis working");


  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="*" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
