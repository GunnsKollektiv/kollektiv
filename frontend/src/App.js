import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { get, post } from './api';
import './App.css';
import Login from './components/auth/Login';
import Header from './components/header/Header';
import Home from './components/home/Home';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      token: null
    }
  }

  componentDidMount() {
    // check if user already has active token
    if (localStorage.getItem('token')) {
      this.setState({ token: localStorage.getItem('token') })
      get({
        url: 'api/auth/user/',
        callback: data => this.setState({ user: data, loading: false }),
        errorCallback: error => this.setState({ loading: false })
      })
    } else {
      this.setState({ loading: false })
    }
  }

  updateUser = (user, token) => {
    this.setState({ user: user, token: token })
    localStorage.setItem('token', token);
  }

  handleLogout = () => {
    post({
      url: 'api/auth/logout/',
      callback: data => this.updateUser(null, null)
    })
  }

  render() {

    if (!this.state.loading) {
      return (
        <Router>
          <div className="App">

            <Header user={this.state.user} handleLogout={this.handleLogout} />

            <div className="main-content">
              <Switch>
                <Route exact path="/login">
                  {this.state.user === null ? <Login updateUser={this.updateUser} /> : <Redirect to='/' />}
                </Route>
                <PrivateRoute exact path="/" isAuthenticated={this.state.user !== null}>
                  <Home user={this.state.user} />
                </PrivateRoute>
                <Route path="/">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>

          </div>
        </Router>
      );
    }
    return null;
  }
}

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default App;
