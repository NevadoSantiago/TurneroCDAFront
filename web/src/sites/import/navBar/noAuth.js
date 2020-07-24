import React from 'react';
import { NavLink } from "react-router-dom";
import '../../../style.css';
import {navBarResponse} from '../../../constantes/textsScripts'

class NavNoAuth extends React.Component {
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
export default NavNoAuth

