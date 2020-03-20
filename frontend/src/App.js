import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { get, post } from './api';
import './App.css';
import Login from './components/auth/Login';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Lists from './components/lists/Lists';
import Error404 from './components/error/Error404';
import Group from './components/group/Group';

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
    this.checkToken()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkToken()
    }
  }

  checkToken = () => {
    // check if user has an active token in local storage
    if (localStorage.getItem('token')) {
      this.setState({ token: localStorage.getItem('token') })
      get({
        url: 'api/auth/user/',
        callback: data => this.setState({ user: data, loading: false }),
        errorCallback: error => this.setState({ user: null, loading: false })
      })
    } else {
      this.setState({ user: null, loading: false })
    }
  }

  updateUser = (user, token) => {
    localStorage.setItem('token', token);
    this.setState({ user: user, token: token })
  }

  handleLogout = () => {
    post({
      url: 'api/auth/logout/',
      callback: data => this.updateUser(null, null)
    })
  }

  handleRedirect = pathname => {
    this.props.history.push(pathname)
  }

  render() {

    if (!this.state.loading) {
      return (
        <div className="App">

          <Header handleRedirect={this.handleRedirect} user={this.state.user} handleLogout={this.handleLogout} />

          <div className="main-content">
            <Switch>
              <Route exact path="/login">
                {this.state.user === null ? <Login updateUser={this.updateUser} /> : <Redirect to='/' />}
              </Route>
              <PrivateRoute exact path="/" isAuthenticated={this.state.user !== null}>
                <Home user={this.state.user} />
              </PrivateRoute>
              <PrivateRoute exact path="/lists" isAuthenticated={this.state.user !== null}>
                <Lists user={this.state.user} />
              </PrivateRoute>
              <PrivateRoute exact path="/group" isAuthenticated={this.state.user !== null}>
                <Group user={this.state.user} />
              </PrivateRoute>
              <Route path="*">
                <Error404 />
              </Route>
            </Switch>
          </div>

        </div>
      );
    }
    return "Loading...";
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

export default withRouter(App);
