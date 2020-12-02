import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import EVs from './EVs';
import Contact from './Contact';
import Auth from './Auth';
import Navigation from './Navigation';
import EV from './EV';
import LogOut from './LogOut';
import withAuth from '../support/withAuth';
import OwnerEVs from './OwnerEVs';
import OwnerEV from './OwnerEV';
import EVForm from './EVForm';

function AppRouter() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(undefined);

    const handleAuthChange = (userId) => {setUserId(userId)};

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        let url = (process.env.NODE_ENV === 'production')
                ? '/content/owner/checkAuth' 
                : `${process.env.REACT_APP_SERVER_URL}/content/owner/checkAuth`;

        fetch(url, { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    setLoggedIn(true);
                    return res.json();
                } else {
                    console.log('User not logged in');
                    setLoggedIn(false);
                    setUserId(undefined);
                    return;
                }
            })
            .then(res => {
                if (res) {
                    setUserId(res.userId);
                }
            })
            .catch(err => {
                console.error(err);
            });
      });

      let evsUrl = (process.env.NODE_ENV === 'production')
                ? '/content/evs'
                : `${process.env.REACT_APP_SERVER_URL}/content/evs`;

    return (
        <Router>
            <Navigation loggedIn={loggedIn} userId={userId}/>
            <Switch>
                <Route 
                    path='/' 
                    exact
                    render={(props) => (<Home loggedIn={loggedIn} userId={userId} {...props} />)} 
                >
                </Route>
                <Route 
                    path='/evs' 
                    exact 
                    render={(props) => (<EVs fetchUrl={evsUrl} {...props} />)}
                >
                </Route>
                <Route path='/ev/:id' exact component={EV}></Route>
                <Route path='/owner/:id/contact' exact component={Contact}></Route>
                <Route 
                    path='/owner/signup'
                    exact
                    render={(props) => (<Auth onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route 
                    path='/owner/login'
                    exact
                    render={(props) => (<Auth onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route 
                    path='/owner/logout'
                    exact 
                    render={(props) => (<LogOut onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route path='/owner/:id/evs' component={withAuth(OwnerEVs)}></Route>
                <Route path='/owner/:id/ev/create' component={withAuth(EVForm)}></Route>
                <Route path='/owner/:id/ev/:id/update' component={withAuth(EVForm)}></Route>
                <Route path='/owner/:id/ev/:id' component={withAuth(OwnerEV)}></Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;
