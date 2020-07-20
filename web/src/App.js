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
			<div className="container">
				<NavLink to="/" className="nav-link" exact={true} activeClassName='subtitle'>Home</NavLink>&nbsp;
				<NavLink to="/about" className="nav-link" exact={true} activeClassName='subtitle'>About</NavLink>
				
				<Route path="/" exact component={Home} />
				<Route path="/about" component={About} />
			</div>
		</Router>
	);
}

export default App;
