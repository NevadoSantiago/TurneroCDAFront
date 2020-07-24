import React from 'react';
import { NavLink } from "react-router-dom";
import '../../../style.css';
import { navBarResponse } from '../../../constantes/textsScripts'

class NavNoAuth extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
        function addElement(parentId, elementTag, elementId, html) {
            // Adds an element to the document
            var p = document.getElementById(parentId);
            var newElement = document.createElement(elementTag);
            newElement.setAttribute('id', elementId);
            newElement.async = true
            newElement.innerHTML = html;
            p.appendChild(newElement);
        }

        function removeElement(elementId) {
            // Removes an element from the document
            var element = document.getElementById(elementId);
            element.parentNode.removeChild(element);
        }

        if (document.getElementById('navbar') !== null) {
            removeElement('navbar')
        }
        
        addElement('scripts', 'script', 'navbar', navBarResponse)
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

                <div id="navbarBasicExample" className="navbar-menu">
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

