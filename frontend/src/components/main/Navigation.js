import React, { useState } from 'react';
import logo from '../../media/logo.svg';
import '../../css/Navigation.css';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Navigation(props) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="navigation">
            <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg">
                <div className="container">
                    <Link className="navbar-brand" to="/" onClick={() => setExpanded(false)}>
                        <img src={logo} className="App-logo" alt="logo" />
                        FullyElectric
                    </Link>
                    <Navbar.Toggle 
                        onClick={() => setExpanded(expanded ? false : "expanded")} 
                        aria-controls="navbarResponsive"
                    />
                    <Navbar.Collapse id="navbarResponsive">
                        <Nav className="ml-auto">
                            <Nav.Item
                                className={`${
                                    props.location.pathname === "/" ? "active" : "" 
                                }`}
                            >
                                <Link className="nav-link" to="/" onClick={() => setExpanded(false)}>
                                    Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </Nav.Item>

                            <Nav.Item 
                                className={`${
                                    props.location.pathname === "/evs" ? "active" : "" 
                                }`}
                            >
                                <Link 
                                    className="nav-link" 
                                    to="/evs" 
                                    onClick={() => setExpanded(false)}
                                >
                                    Buy
                                </Link>
                            </Nav.Item>

                            {props.loggedIn ? (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === `/seller/${props.userId}/evs` 
                                            ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to={`/seller/${props.userId}/evs`}
                                        onClick={() => setExpanded(false)}
                                    >
                                        Sell
                                    </Link>
                                </Nav.Item>
                            ) : (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === "/seller/signup" ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to="/seller/signup" 
                                        onClick={() => setExpanded(false)}
                                    >
                                        Sell
                                    </Link>
                                </Nav.Item>
                            )}
                            
                            {props.loggedIn ? (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === "/seller/logout" ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to="/seller/logout" 
                                        onClick={() => setExpanded(false)}
                                    >
                                        Log out
                                    </Link>
                                </Nav.Item>
                            ) : (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === "/seller/login" ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to="/seller/login" 
                                        onClick={() => setExpanded(false)}
                                    >
                                        Log in
                                    </Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default withRouter(Navigation);
