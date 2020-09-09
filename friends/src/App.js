import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/PrivateRoute';
import LoginForm from './components/LoginForm.js';
import FriendsList from './components/FriendsList';

import styled from 'styled-components';

function App() {
  return (
    <Router>
      <div className="App">
          <StyledLink to = '/login'>Login</StyledLink>
          <StyledLink to = '/friends'>Friends List</StyledLink>
          <Switch>
            <PrivateRoute exact path = '/friends' component = { FriendsList }/>
            <Route path = '/login' component = { LoginForm }/>
            <Route component = { LoginForm }/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black; 
    font-size: 1.5rem;
    margin: 1rem;
    border-radius: 1rem;
    padding: 2rem;
    background-color: purple;
`
