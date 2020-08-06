import React from "react";
import { NavLink } from "react-router-dom";
import "../../../style.css";
import { connect } from "react-redux";
import { faUser, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  SET_CONTROL_ES,
  SET_RECEPCIONISTAS,
  CERRAR_SESION,
} from "../../../constantes/actionRedux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navBarResponse } from "../../../constantes/textsScripts";

class NavAdminSucursal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    function addElement(parentId, elementTag, elementId, html) {
      // Adds an element to the document
      var p = document.getElementById(parentId);
      var newElement = document.createElement(elementTag);
      newElement.setAttribute("id", elementId);
      newElement.async = true;
      newElement.innerHTML = html;
      p.appendChild(newElement);
    }

    function removeElement(elementId) {
      // Removes an element from the document
      var element = document.getElementById(elementId);
      element.parentNode.removeChild(element);
    }

    if (document.getElementById("navbar") !== null) {
      removeElement("navbar");
    }

    addElement("scripts", "script", "navbar", navBarResponse);
  }

  cerrarSesion = () => {
    localStorage.removeItem("token");
    const { cerrarSesion } = this.props;
    cerrarSesion();
  };

  render() {
    const { usuario, tipoUsuario } = this.props;
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <button
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            style={{
              backgroundColor: "white",
              border: 0,
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className="navbar-start"></div>

        <div id="navbarBasicExample" className="navbar-menu">
          <NavLink
            to="/"
            className="navbar-item"
            exact={true}
            activeClassName="navbar-item active"
          >
            Inicio
          </NavLink>
          <div className="navbar-item has-dropdown is-hoverable">
            <button
              className="navbar-link"
              style={{
                backgroundColor: "white",
                border: 0,
              }}
            >
              Administrador de Personal
            </button>

            <div className="navbar-dropdown">
              <NavLink
                to="/listaES"
                // onClick={() => this.getEmpleadosSucRol(sucursal.sucursalId, CONTROL_ES)}
                className="navbar-item"
                activeClassName="navbar-item active"
              >
                Control E/S
              </NavLink>
              <NavLink
                to="/listaRecepcion"
                //onClick={() => this.getEmpleadosSucRol(sucursal.sucursalId, RECEPCION)}
                className="navbar-item"
                activeClassName="navbar-item active"
              >
                Recepcion
              </NavLink>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <div className="dropdown is-hoverable is-right">
                  <div className="dropdown-trigger">
                    <button
                      className="button is-primary is-outlined is-rounded"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu2"
                    >
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
                      <p className="dropdown-item">{tipoUsuario}</p>
                      <hr className="dropdown-divider" />
                      <p
                        className="dropdown-item"
                        style={{ margin: -15, marginBottom: -30 }}
                      >
                        <NavLink
                          to="/login"
                          onClick={() => this.cerrarSesion()}
                          className="button is-danger"
                          activeClassName="button is-danger"
                          style={{ paddingLeft: 40, paddingRight: 40 }}
                        >
                          Cerrar sesión
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setControlES: (datos) => dispatch({ type: SET_CONTROL_ES, data: datos }),
    setRecepcionistas: (datos) =>
      dispatch({ type: SET_RECEPCIONISTAS, data: datos }),
    cerrarSesion: () => dispatch({ type: CERRAR_SESION }),
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

export default connect(mapStateToProps, mapDispatchToProps)(NavAdminSucursal);
