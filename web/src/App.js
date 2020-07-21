import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from './sites/About'
import { ADMIN, EMPLEADO } from "./constantes/tiposUsuarios"
import NoAutorizado from './sites/NoAutorizado'
import Login from './sites/Login'
import Home from './sites/Home'
import './style.css'
import AuthRoutePrivate from './sites/import/AuthRoute'
import NavBar from './sites/import/Navbar'

class App extends React.Component {
	render() {
		return (
			<Router>
				<NavBar autorizado={ADMIN} autorizado2={EMPLEADO} />
				<div className="container">
					<Switch>
						<Route exact path="/login" component={Login}></Route>
						<Route path="/noAutorizado" component={NoAutorizado}></Route>
						<AuthRoutePrivate path="/about" component={About} autorizado={ADMIN} autorizado2={null}></AuthRoutePrivate>
						<AuthRoutePrivate path="/" component={Home} autorizado={ADMIN} autorizado2={EMPLEADO} ></AuthRoutePrivate>
					</Switch>
				</div>
			</Router>
		)
	}

}
export default App;
