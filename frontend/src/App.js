import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { get, post } from './api';
import './App.css';
import Login from './components/auth/Login';
import Error404 from './components/error/Error404';
import Game from './components/game/Game';
import Group from './components/group/Group';
import Header from './components/header/Header';
import Lists from './components/lists/Lists';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      token: null,
      group: null
    }
  }

  componentDidMount() {
    this.checkToken(true)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkToken()
    }
  }

  redirect = pathname => {
    this.props.history.push(pathname)
  }

  checkToken = (checkGroup = false) => {
    // check if user has an active token in local storage
    if (localStorage.getItem('token')) {
      this.setState({ token: localStorage.getItem('token') })
      get({
        url: 'api/auth/user/',
        callback: data => {
          this.setState({ user: data })
          if (checkGroup)
            this.getGroup()
        },
        errorCallback: error => this.setState({ user: null, loading: false })
      })
    } else {
      this.setState({ user: null, loading: false })
    }
  }

  updateUser = (user, token) => {
    localStorage.setItem('token', token);
    this.setState({ user: user, token: token })
    this.getGroup();
  }

  handleLogout = () => {
    post({
      url: 'api/auth/logout/',
      callback: data => {
        this.updateUser(null, null)
        this.props.history.push("/")
      }
    })
  }

  getGroup = () => {
    this.setState({ loading: true })
    get({
      url: 'api/group/details/',
      callback: this.getGroupCallback,
      errorCallback: error => this.setState({ group: null, loading: false })
    })
  }

  getGroupCallback = data => {
    this.setState({ group: data, loading: false })
  }

  PrivateRoute = ({ children, ...props }) => {
    return (
      <Route
        {...props}
        render={({ location }) => {
          if (this.state.user !== null) {
            if (!this.state.group && props.path !== "/") {
              return <Redirect to="/" />
            }
            return children
          }
          return <Redirect to={{ pathname: "/login", state: { from: location } }} />
        }}
      />
    );
  }

  render() {
    return (
      <div className="App">

        <Header
          redirect={this.redirect}
          user={this.state.user}
          handleLogout={this.handleLogout}
          group={this.state.group}
        />

        {!this.state.loading && (

          <div className="main-content">
            <Switch>
              <Route exact path="/login">
                {this.state.user === null ? <Login updateUser={this.updateUser} /> : <Redirect to='/' />}
              </Route>
              <this.PrivateRoute exact path="/">
                <Group group={this.state.group} getGroup={this.getGroup} />
              </this.PrivateRoute>
              <this.PrivateRoute exact path="/lists">
                <Lists user={this.state.user} />
              </this.PrivateRoute>
              <this.PrivateRoute exact path="/game">
                <Game />
              </this.PrivateRoute>

              <Route path="*">
                <Error404 />
              </Route>
            </Switch>
          </div>

        )}

      </div>
    );

  }
}



export default withRouter(App);
