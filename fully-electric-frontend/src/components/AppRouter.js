import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import EVs from './EVs';
import Contact from './Contact';
import Auth from './Auth';
import Navigation from './Navigation';
import EV from './EV';
import LogOut from './LogOut';
import withAuth from './support_components/withAuth';
import SellerEVs from './SellerEVs';
import SellerEV from './SellerEV';
import EVForm from './EVForm';

function AppRouter() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(undefined);

    const handleAuthChange = (userId) => {setUserId(userId)};

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        let url = (process.env.NODE_ENV === 'production')
                ? '/content/seller/checkAuth' 
                : `${process.env.REACT_APP_SERVER_URL}/content/seller/checkAuth`;

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
                <Route path='/' exact component={Home}></Route>
                <Route 
                    path='/evs' 
                    exact 
                    render={(props) => (<EVs fetchUrl={evsUrl} {...props} />)}
                >
                </Route>
                <Route path='/ev/:id' exact component={EV}></Route>
                <Route path='/seller/:id/contact' exact component={Contact}></Route>
                <Route 
                    path='/seller/signup'
                    exact
                    render={(props) => (<Auth onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route 
                    path='/seller/login'
                    exact
                    render={(props) => (<Auth onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route 
                    path='/seller/logout'
                    exact 
                    render={(props) => (<LogOut onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route path='/seller/:id/evs' component={withAuth(SellerEVs)}></Route>
                <Route path='/seller/:id/ev/create' component={withAuth(EVForm)}></Route>
                <Route path='/seller/:id/ev/:id/update' component={withAuth(EVForm)}></Route>
                <Route path='/seller/:id/ev/:id' component={withAuth(SellerEV)}></Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;
