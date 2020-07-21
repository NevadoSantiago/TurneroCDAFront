import React from 'react';
import { NavLink } from "react-router-dom";
import '../../style.css';
import { connect } from 'react-redux'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const { usuario, autorizado, autorizado2, tipoUsuario } = this.props

        if (usuario != null) {
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
                        <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <div className="navbar-item">
                                    <span className="icon has-text-info">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    <span>{usuario}</span>
                                </div>
                                <div className="navbar-dropdown">
                                    <p class="navbar-item">
                                        {autorizado}
                                    </p>
                                    <p class="navbar-item">
                                        {autorizado2}
                                    </p>
                                </div>
                            </div>
                            <div className="navbar-item">
                                <div className="buttons">
                                    <NavLink to="#" className="button is-danger" activeClassName='button is-warning'>Cerrar sesión</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            )
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
                        <div className="navbar-start">
                            <NavLink to="/" className="navbar-item" exact={true} activeClassName='navbar-item active'>Home</NavLink>
                            <NavLink to="/about" className="navbar-item" activeClassName='navbar-item active'>About</NavLink>
                        </div>
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
    };
};

const mapStateToProps = (state) => {
    return {
        usuario: state.user.usuario,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
