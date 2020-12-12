import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Movie from '../pages/Movie';
import Watchlist from '../pages/Watchlist';
import History from '../pages/History';
import Recommendations from '../pages/Recommendations';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import { useState } from 'react';
import Login from '../pages/Login';
import { UserContext } from '../context/UserContext';

export default function App() {
  const { user } = useContext(UserContext);

  // const cont = useContext(UserContext);
  // const user = false;
  console.log('user', user);
  // console.log('cont', cont);
  return (
    <Router>
      {user ? (
        <>
          <Header />
          <Switch>
            <Route path='/search' exact>
              <Search />
            </Route>
            <Route path='/search/:terms'>
              <Search />
            </Route>
            <Route path='/movies/:movieId' exact>
              <Movie />
            </Route>
            <Route path='/watchlist' exact>
              <Watchlist />
            </Route>
            <Route path='/history' exact>
              <History />
            </Route>
            <Route path='/recommendations' exact>
              <Recommendations />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </>
      ) : (
        <Switch>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      )}
    </Router>
  );
}
