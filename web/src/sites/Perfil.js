import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
import Correcto from "../servicios/alertas/Correcto";
import { URL_API_RESERVA } from "../constantes/urlApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {
  ADMIN_GENERAL,
  ADMIN_SUCURSAL,
  CONTROL_ES,
  RECEPCION,
} from "../constantes/tiposUsuarios";

class Perfil extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      correcto: null,
    };
  }

  mostrarRol = () => {
    const { tipoUsuario } = this.props;
    switch (tipoUsuario) {
      case ADMIN_GENERAL:
        return "Administrador general";
      case ADMIN_SUCURSAL:
        return "Administrador de sucursal";
      case CONTROL_ES:
        return "Control entrada y salida";
      case RECEPCION:
        return "Recepcionista";
      default:
        break;
    }
  };

  render() {
    const { error, correcto } = this.state;
    const { usuario, tipoUsuario, sucursal, idUsuario } = this.props;

    return (
      <React.Fragment>
        <section className="hero is-bold">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div
                  className="column is-4"
                  style={{ textAlign: "center", padding: "1.5rem" }}
                >
                  <p className="title mobile-description">
                    {"Tu perfil" /*"ID " + idUsuario*/}
                  </p>
                  <p className="title" style={{ fontSize: "240px" }}>
                    <FontAwesomeIcon icon={faUserCircle} />
                  </p>
                </div>
                <div
                  className="column"
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    marginRight: "15px",
                    marginLeft: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <div className="field" style={{ marginBottom: "5px" }}>
                    <p className="control">
                      <input
                        className="input black-placeholder"
                        type="text"
                        placeholder={"Apellido"}
                        style={{
                          backgroundColor: "transparent",
                          fontSize: "2rem",
                          fontWeight: 600,
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          paddingLeft: 0,
                          paddingRight: 0,
                          height: 0,
                          borderWidth: "0px 0px thick 0px",
                          borderStyle: "dashed",
                        }}
                      />
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <input
                        className="input black-placeholder"
                        type="text"
                        placeholder={"Nombre"}
                        style={{
                          backgroundColor: "transparent",
                          fontSize: "1.5rem",
                          paddingTop: "15px",
                          paddingBottom: "20px",
                          paddingLeft: 0,
                          paddingRight: 0,
                          height: 0,
                          borderWidth: "0px 0px thick 0px",
                          borderStyle: "dashed",
                        }}
                      />
                    </p>
                  </div>
                  <pre className="subtitle mobile-description">
                    {this.mostrarRol()}
                  </pre>
                  <p className="subtitle mobile-description">
                    {sucursal ? sucursal.nombre : "No tiene sucursal a cargo"}
                    <br />
                    {sucursal && sucursal.direccion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="container"
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
            marginRight: "15px",
            marginLeft: "15px",
            marginBottom: "15px",
          }}
        >
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <label className="label mobile-description">Usuario</label>
                <p className="control">
                  <input
                    className="input is-dark is-rounded black-placeholder"
                    type="text"
                    placeholder={usuario}
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      height: 0,
                    }}
                  />
                </p>
              </div>
              <div className="field">
                <label className="label mobile-description">Contraseña</label>
                <p className="control">
                  <input
                    className="input is-dark is-rounded black-placeholder"
                    type="password"
                    placeholder={"Nueva contraseña"}
                    style={{
                      fontSize: "1rem",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      height: 0,
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label mobile-description">
              Correo electrónico
            </label>
            <p className="control">
              <input
                className="input is-dark is-rounded black-placeholder"
                type="text"
                placeholder={"Correo electrónico"}
                style={{
                  fontSize: "1rem",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  height: 0,
                }}
              />
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    usuario: state.user.usuario,
    tipoUsuario: state.user.tipoUsuario,
    idUsuario: state.user.idUsuario,
    sucursal: state.user.sucursal,
    token: state.user.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
