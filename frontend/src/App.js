import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { get } from './api';
import './App.css';
import Login from './components/auth/Login';
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
    if (localStorage.getItem('token')) {
      this.setState({ token: localStorage.getItem('token') })
      get({
        url: 'api/auth/user/',
        token: localStorage.getItem('token'),
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

  render() {

    if (this.state.loading) {
      return null;
    }

    if (!this.state.user) {
      return <div className="App">
        <Login updateUser={this.updateUser} />
      </div>
    }

    return (
      <div className="App">
        <Home updateUser={this.updateUser} user={this.state.user} />
      </div>
    );
  }
}

export default App;
