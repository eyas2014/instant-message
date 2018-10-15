import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './lib/reducers';

const store = createStore(rootReducer);

const theme = createMuiTheme({
  palette: {
    primary: { main: '#5f5fab' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});


class App extends Component {
  componentDidMount(){
      console.log("i tis working");


  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Login}  />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="*" component={Login} />
            </Switch>
          </Router>
        </div>
      </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
