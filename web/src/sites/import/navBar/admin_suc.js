import React from 'react';
import { NavLink } from "react-router-dom";
import '../../../style.css';
import { connect } from 'react-redux'
import { faUser, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { SET_CONTROL_ES, SET_RECEPCIONISTAS, CERRAR_SESION } from "../../../constantes/actionRedux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {navBarResponse} from '../../../constantes/textsScripts'

class NavAdminSucursal extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }
    componentDidMount() {
        const script = document.createElement('script');

        script.type = 'text/javascript'
        script.async = true
        script.innerHTML =navBarResponse

        document.body.appendChild(script);
    }

    cerrarSesion = () => {
        const { cerrarSesion } = this.props
        cerrarSesion()
    }

    render() {
        const { usuario, tipoUsuario, sucursal } = this.props
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-start">
                    <NavLink to="/" className="navbar-item" exact={true} activeClassName='navbar-item active'>Inicio</NavLink>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Administrador de Personal
                        </a>

                        <div class="navbar-dropdown">
                            <NavLink
                                to="/listaES"
                               // onClick={() => this.getEmpleadosSucRol(sucursal.sucursalId, CONTROL_ES)}
                                className="navbar-item" activeClassName='navbar-item active'>
                                Control E/S</NavLink>
                            <NavLink
                                to="/listaRecepcion"
                                //onClick={() => this.getEmpleadosSucRol(sucursal.sucursalId, RECEPCION)}
                                className="navbar-item"
                                activeClassName='navbar-item active'>
                                Recepcion</NavLink>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <div className="dropdown is-hoverable is-right">
                                    <div className="dropdown-trigger">
                                        <button className="button is-primary is-outlined is-rounded" aria-haspopup="true" aria-controls="dropdown-menu2">
                                            <span className="icon has-text-info">
                                                <FontAwesomeIcon icon={faUser} />
                                            </span>
                                            <span>{usuario}</span>
                                            <span className="icon is-small">
                                                <FontAwesomeIcon icon={faAngleDown} />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                        <div className="dropdown-content">
                                            <p className="dropdown-item">
                                                {tipoUsuario}
                                            </p>
                                            <hr className="dropdown-divider" />
                                            <p className="dropdown-item" style={{ margin: -15, marginBottom: -30 }}>
                                                <NavLink to="/login" onClick={() => this.cerrarSesion()} className="button is-danger" activeClassName='button is-danger' style={{ paddingLeft: 40, paddingRight: 40 }} >Cerrar sesión</NavLink>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setControlES: (datos) => dispatch({ type: SET_CONTROL_ES, data: datos }),
        setRecepcionistas: (datos) => dispatch({ type: SET_RECEPCIONISTAS, data: datos }),
        cerrarSesion: () => dispatch({ type: CERRAR_SESION })
    };
};

const mapStateToProps = (state) => {
    return {
        usuario: state.user.usuario,
        sucursal: state.user.sucursal,
        tipoUsuario: state.user.tipoUsuario,
        recepcionistas: state.empleado.recepcionistas,
        controlES: state.empleado.controlES,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavAdminSucursal)
