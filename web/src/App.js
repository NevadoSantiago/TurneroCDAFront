import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/* import AdministrarPersonal from './sites/AdministrarPersonal' */
import {
  ADMIN_SUCURSAL,
  ADMIN_GENERAL,
  CONTROL_ES,
  RECEPCION,
} from "./constantes/tiposUsuarios";
import NoAutorizado from "./sites/NoAutorizado";
import Login from "./sites/Login";
import Home from "./sites/Home";
import NuevoTurno from "./sites/NuevoTurno";
import EditarPersona from "./sites/EditarPersona";
import NuevoEmpleado from "./sites/NuevoEmpleado";
import Recepcion from "./sites/listados/Recepcion";
import ControlES from "./sites/listados/ControlES";
import Sucursales from "./sites/listados/Sucursales";
import EstadisticasSucursal from "./sites/EstadisticasSucursal";
import AuthRoutePrivate from "./sites/import/AuthRoute";
import NavBar from "./sites/import/Navbar";
import ListaEspera from "./sites/ListaEspera";
import EditarSucursal from "./sites/EditarSucursal";
import NuevaSucursal from "./sites/NuevaSucursal";
import "./style.css";

//PRUEBA PRETTTIEERRRRR SANTIadsdsddsdasd

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/noAutorizado" component={NoAutorizado}></Route>
            <AuthRoutePrivate
              path="/sucursal/nuevo"
              component={NuevaSucursal}
              autorizado={ADMIN_GENERAL}
              autorizado2={null}
              autorizado3={null}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/empleado/nuevo"
              component={NuevoEmpleado}
              autorizado={ADMIN_GENERAL}
              autorizado2={null}
              autorizado3={null}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/nuevo"
              component={NuevoTurno}
              autorizado={ADMIN_SUCURSAL}
              autorizado2={CONTROL_ES}
              autorizado3={RECEPCION}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/lista"
              exact
              component={ListaEspera}
              autorizado={ADMIN_SUCURSAL}
              autorizado2={CONTROL_ES}
              autorizado3={RECEPCION}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/estadisticas"
              component={EstadisticasSucursal}
              autorizado={ADMIN_SUCURSAL}
              autorizado2={CONTROL_ES}
              autorizado3={RECEPCION}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/editar"
              component={EditarPersona}
              autorizado={ADMIN_SUCURSAL}
              autorizado2={CONTROL_ES}
              autorizado3={RECEPCION}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/listaES"
              exact
              component={ControlES}
              autorizado={ADMIN_SUCURSAL}
              autorizado2={null}
              autorizado3={null}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/listaRecepcion"
              exact
              component={Recepcion}
              autorizado={ADMIN_SUCURSAL}
              autorizado2={null}
              autorizado3={null}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/editarSucursal"
              exact
              component={EditarSucursal}
              autorizado={ADMIN_SUCURSAL}
              autorizado2={ADMIN_GENERAL}
              autorizado3={null}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/adminSucursales"
              exact
              component={Sucursales}
              autorizado={ADMIN_GENERAL}
              autorizado2={null}
              autorizado3={null}
              autorizado4={null}
            ></AuthRoutePrivate>
            <AuthRoutePrivate
              path="/"
              component={Home}
              autorizado={ADMIN_SUCURSAL}
              autorizado2={CONTROL_ES}
              autorizado3={RECEPCION}
              autorizado4={ADMIN_GENERAL}
            ></AuthRoutePrivate>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
