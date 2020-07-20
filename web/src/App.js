import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './sites/Home'
import About from './sites/About'
//import './App.css';
import './style.css'

function App() {
	return (
		<Router>
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div class="navbar-brand">
					<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="navbarBasicExample" class="navbar-menu">
					<div class="navbar-start">
						<NavLink to="/" className="navbar-item" exact={true} activeClassName='navbar-item active'>Home</NavLink>
						<NavLink to="/about" className="navbar-item" activeClassName='navbar-item active'>About</NavLink>
					</div>
				</div>
			</nav>
			<div className="container">
				<Route path="/" exact component={Home} />
				<Route path="/about" component={About} />
			</div>
		</Router >
	);
}

export default App;
