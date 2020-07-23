import React from 'react';
import { NavLink } from "react-router-dom";
import '../../style.css';
import { connect } from 'react-redux'
import { faUser, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { CERRAR_SESION } from "../../constantes/actionRedux"
import { ADMIN, EMPLEADO } from '../../constantes/tiposUsuarios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
        const script = document.createElement('script');

        script.type = 'text/javascript'
        script.async = true
        script.innerHTML =
        `
        document.addEventListener('DOMContentLoaded', () => {

            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
            
            if ($navbarBurgers.length > 0) {
            
                $navbarBurgers.forEach( el => {
                    el.addEventListener('click', () => {
            
                        const target = el.dataset.target;
                        const $target = document.getElementById(target);
            
                        el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');

                        const $navbarDropdowns = Array.prototype.slice.call(document.querySelectorAll('.dropdown'), 0);

                        $navbarDropdowns.forEach( drop => {
                            drop.classList.toggle('is-right');
                        });
                    });
                });
            }
        });
        `
        
        document.body.appendChild(script);
    }

    cerrarSesion = () => {
        const { cerrarSesion } = this.props
        cerrarSesion()
    }

    render() {
        const { usuario, tipoUsuario } = this.props

        if (tipoUsuario != null) {
            switch (tipoUsuario) {
                case ADMIN: {
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

                                    <div className="navbar-dropdown">
                                        <a className="navbar-item" href="/listado/ES">
                                            Control E/S
                                    </a>
                                        <a className="navbar-item" href="/listado/recepcion">
                                            Recepción
                                    </a>
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
                case EMPLEADO: {
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
                                    <NavLink to="/" className="navbar-item" exact={true} activeClassName='navbar-item active'>Inicio</NavLink>
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
        } else {
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
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <NavLink to="/login" className="button is-primary" activeClassName='button is-warning'>Iniciar sesión</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            )
        }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        cerrarSesion: (datos) => dispatch({ type: CERRAR_SESION }),
    };
};

const mapStateToProps = (state) => {
    return {
        usuario: state.user.usuario,
        tipoUsuario: state.user.tipoUsuario
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
