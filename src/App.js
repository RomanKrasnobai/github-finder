import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Axios from 'axios';
import {Search} from './components/users/Search';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About } from './pages/About';
import User from './components/users/User';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
  };

  searchUsers = async text => {
    this.setState({loading: true});
    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false});
  };

  getUser = async (username) => {
    this.setState({loading: true});
    const res = await Axios.get(
      `https://api.github.com/search/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({user: res.data, loading: false});
  };

  clearUsers = () => {
    this.setState({users: [], loading: false});
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar title={"Github Finder"}/>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0}
                  />
                  <Users
                    loading={this.state.loading}
                    users={this.state.users}
                  />
                </Fragment>
              )}/>
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                  <User {...props} getUser={this.getUser} user={this.state.user} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  };
}

export default App;
