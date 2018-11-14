import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Test from './pages/test';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './lib/reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer,
                          applyMiddleware(thunkMiddleware));

const theme = createMuiTheme({
  palette: {
    primary: { main: '#538fbe' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});


class App extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Login}  />
              <Route path="/dashboard/:username" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/test" component={Test} />
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
