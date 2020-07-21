import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './sites/Home'
import About from './sites/About'
import Navbar from './sites/import/Navbar'
import Login from './sites/Login'
//import './App.css';
import './style.css'

function App() {
	return (
		<Router>
			<Navbar />
			<div className="container">
				<Route path="/" exact component={Home} />
				<Route path="/about" component={About} />
				<Route path="/login" component={Login} />
			</div>
		</Router >
	);
}

export default App;
