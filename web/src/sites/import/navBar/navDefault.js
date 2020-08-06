import React from "react";
import { NavLink } from "react-router-dom";
import "../../../style.css";
import { connect } from "react-redux";
import { CERRAR_SESION } from "../../../constantes/actionRedux";
import { navBarResponse } from "../../../constantes/textsScripts";

class NavDefault extends React.Component {
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

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <NavLink
                  to="/login"
                  onClick={() => this.cerrarSesion()}
                  className="button is-danger"
                  activeClassName="button is-danger"
                >
                  Cerrar sesión
                </NavLink>
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
    cerrarSesion: () => dispatch({ type: CERRAR_SESION }),
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavDefault);
