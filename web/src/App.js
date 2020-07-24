import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdministrarPersonal from './sites/AdministrarPersonal'
import { ADMIN_SUCURSAL,ADMIN_GENERAL,CONTROL_ES,RECEPCION } from "./constantes/tiposUsuarios"
import NoAutorizado from './sites/NoAutorizado'
import Login from './sites/Login'
import Home from './sites/Home'
import NuevoTurno from './sites/NuevoTurno'
import EditarPersona from './sites/EditarPersona'
import Recepcion from './sites/listados/Recepcion'
import ControlES from './sites/listados/ControlES'
import EstadisticasSucursal from './sites/EstadisticasSucursal'
import './style.css'
import AuthRoutePrivate from './sites/import/AuthRoute'
import NavBar from './sites/import/Navbar'

class App extends React.Component {
	render() {
		return (
			<Router>
				<NavBar />
				<div className="container">
					<Switch>
						<Route exact path="/login" component={Login}></Route>
						<Route path="/noAutorizado" component={NoAutorizado}></Route>
						<AuthRoutePrivate path="/nuevo" component={NuevoTurno} autorizado={ADMIN_SUCURSAL} autorizado2={CONTROL_ES} autorizado3={RECEPCION} ></AuthRoutePrivate>
						<AuthRoutePrivate path="/estadisticas" component={EstadisticasSucursal} autorizado={ADMIN_SUCURSAL} autorizado2={CONTROL_ES} autorizado3={RECEPCION} ></AuthRoutePrivate>
						<AuthRoutePrivate path="/editar" component={EditarPersona} autorizado={ADMIN_SUCURSAL} autorizado2={CONTROL_ES} autorizado3={RECEPCION}  ></AuthRoutePrivate>
						<AuthRoutePrivate path="/listaES" exact component={ControlES} autorizado={ADMIN_SUCURSAL} autorizado2={null} autorizado3={null}></AuthRoutePrivate>
						<AuthRoutePrivate path="/listaRecepcion" exact component={Recepcion} autorizado={ADMIN_SUCURSAL} autorizado2={null} autorizado3={null}  ></AuthRoutePrivate>
						<AuthRoutePrivate path="/administrarPersona" exact component={AdministrarPersonal} autorizado={ADMIN_SUCURSAL} autorizado2={null} autorizado3={null} ></AuthRoutePrivate>
						<AuthRoutePrivate path="/" component={Home} autorizado={ADMIN_SUCURSAL} autorizado2={CONTROL_ES} autorizado3={RECEPCION}  ></AuthRoutePrivate>
					</Switch>
				</div>
			</Router>
		)
	}

}
export default App;
