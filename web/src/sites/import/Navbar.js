import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import '../../style.css';

export default class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div className="navbar-start">
                        <NavLink to="/" className="navbar-item" exact={true} activeClassName='navbar-item active'>Home</NavLink>
                        <NavLink to="/about" className="navbar-item" activeClassName='navbar-item active'>About</NavLink>
                    </div>
                </div>
            </nav>
        )
    }
}