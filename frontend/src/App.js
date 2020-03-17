import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { get, post } from './api';
import './App.css';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import NavbarWrapper from './components/navbar/NavbarWrapper'


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
    if (localStorage.getItem('token')) {
      this.setState({ token: localStorage.getItem('token') })
      get({
        url: 'api/auth/user/',
        callback: data => this.setState({ user: data.email, loading: false }),
        errorCallback: error => this.setState({ loading: false })
      })
    } else {
      this.setState({ loading: false })
    }
  }

  updateUser = (email, token) => {
    this.setState({ user: email, token: token })
    localStorage.setItem('token', token);
  }

  handleLogout = () => {
    post({
      url: 'api/auth/logout/',
      callback: data => this.updateUser(null, null)
    })
  }

  getContent = () => {
    if (this.state.loading) {
      return null;
    }
    if (!this.state.user) {
      return <Login updateUser={this.updateUser} />
    }
    return <Home user={this.state.user} />
  }

  render() {

    return (
      <div className="App">
        <NavbarWrapper user={this.state.user} handleLogout={this.handleLogout} />
        <div className="main-content">
          {this.getContent()}
        </div>
      </div>
    );
  }
}

export default App;
