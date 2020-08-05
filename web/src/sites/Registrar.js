import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
import Correcto from "../servicios/alertas/Correcto";
import { INICIAR_SESION } from "../constantes/actionRedux";
import { URL_API } from "../constantes/urlApi";

class Registrar extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      mostrarFormulario: false,
      persona: null,
      confirmaIdentidad: null,
      continuar: false,
      codigo: null,
      estaRegistrado: false,
    };
  }

  validateData = (codigo, usuario, contrasena, mail, dni) => {
    if (!codigo) {
      return "Ingrese el código de seguridad";
    } else if (!usuario) {
      return "Ingrese el usuario";
    } else if (!contrasena) {
      return "Ingrese la contraseña";
    } else if (!mail) {
      return "Ingrese el correo electrónico";
    } else if (!dni) {
      return "Ingrese el DNI";
    }
  };

  validar = async (e) => {
    e.preventDefault();
    const codigo = e.target.elements.codigo.value;

    const error = this.validateData(codigo, " ", " ", " ", " ");

    if (error) {
      this.setState({
        error,
      });
      return false;
    } else {
      this.setState({
        codigo,
      });
      const url = URL_API + "/api/usuario/validarCodigo/" + codigo;
      await fetch(url, {
        method: "GET",
      }).then(async (response) => {
        if (response.status === 200) {
          const persona = await response.text();
          this.setState({ mostrarFormulario: true, error: null, persona });
        } else if (response.status === 403) {
          this.setState({ error: "El código ingresado no es válido" });
        } else {
          this.setState({ error: "Datos incorrectos" });
        }
      });
    }
  };

  registrar = async (e) => {
    const { codigo } = this.state;
    e.preventDefault();
    const dni = e.target.elements.dni.value;
    const mail = e.target.elements.mail.value;
    const usuario = e.target.elements.usuario.value;
    const password = e.target.elements.password.value;

    const error = this.validateData(codigo, usuario, password, mail, dni);

    if (error) {
      this.setState({
        error,
      });
      return false;
    } else {
      const url = URL_API + "/api/usuario/create";

      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          usuario: usuario,
          contrasena: password,
          dni: dni,
          mail: mail,
          codigo: codigo,
        }),
      }).then((response) => {
        if (response.status === 200) {
          response.text().then((myJson) => {
            this.setState({
              estaRegistrado: true,
              mensaje: myJson,
            });
          });
        } else {
          response.text().then((myJson) => {
            this.setState({
              error: myJson,
            });
          });
        }
      });
    }
  };

  render() {
    const {
      error,
      mensaje,
      mostrarFormulario,
      persona,
      confirmaIdentidad,
      continuar,
    } = this.state;
    const { estaRegistrado } = this.state;
    if (estaRegistrado) {
      setInterval(() => {
        this.props.history.push("/home");
      }, 3000);
    }
    if (!mostrarFormulario) {
      return (
        <div className="hero-body">
          <p className="title">Registrarse</p>
          <form onSubmit={this.validar}>
            <div className="field">
              <label className="label">Código de seguridad</label>
              <div className="control">
                <input
                  className="input is-black"
                  type="text"
                  placeholder="Código de seguridad"
                  name="codigo"
                ></input>
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-primary" type="submit">
                  Validar
                </button>
              </div>
            </div>
            {error && <Error message={error} />}
            {mensaje && <Correcto message={error} />}
          </form>
        </div>
      );
    } else {
      if (confirmaIdentidad === null) {
        return (
          <React.Fragment>
            <div className="hero-body">
              <p className="title">{"Registrarse"}</p>
            </div>
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
                textAlign: "center",
              }}
            >
              <p className="title">
                {"Usted es "}
                <b>{persona}</b>
                {"?"}
              </p>
              <button
                className="button is-success is-outlined is-rounded"
                onClick={() => {
                  this.setState({
                    confirmaIdentidad: true,
                  });
                }}
              >
                Si
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                className="button is-danger is-outlined is-rounded"
                onClick={() => {
                  this.setState({
                    confirmaIdentidad: false,
                  });
                }}
              >
                No
              </button>
            </div>
          </React.Fragment>
        );
      } else {
        if (confirmaIdentidad) {
          if (continuar) {
            return (
              <div className="hero-body">
                <p className="title">Registrarse</p>
                <form onSubmit={this.registrar}>
                  <div className="field">
                    <label className="label">DNI</label>
                    <div className="control">
                      <input
                        className="input is-black"
                        type="text"
                        placeholder="DNI"
                        name="dni"
                      ></input>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-body">
                      <div className="field">
                        <label className="label">Usuario</label>
                        <div className="control">
                          <input
                            className="input is-black"
                            type="text"
                            placeholder="Usuario"
                            name="usuario"
                          ></input>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Contraseña</label>
                        <div className="control">
                          <input
                            className="input is-black"
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Correo electrónico</label>
                    <div className="control">
                      <input
                        className="input is-black"
                        type="text"
                        placeholder="Correo electrónico"
                        name="mail"
                      ></input>
                    </div>
                  </div>
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button className="button is-primary" type="submit">
                        Registrarse
                      </button>
                    </div>
                  </div>
                  {error && <Error message={error} />}
                  {mensaje && <Correcto message={mensaje} />}
                </form>
              </div>
            );
          } else {
            return (
              <React.Fragment>
                <div className="hero-body">
                  <p className="title">{"Registrarse"}</p>
                </div>
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
                    textAlign: "center",
                  }}
                >
                  <p className="title has-text-success">
                    {"La identidad ha sido verificada correctamente"}
                  </p>
                  <button
                    className="button is-success is-outlined is-rounded"
                    onClick={() => {
                      this.setState({
                        continuar: true,
                      });
                    }}
                  >
                    Continuar
                  </button>
                </div>
              </React.Fragment>
            );
          }
        } else {
          return (
            <React.Fragment>
              <div className="hero-body">
                <p className="title">{"Registrarse"}</p>
              </div>
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
                  textAlign: "center",
                }}
              >
                <p className="title has-text-danger">
                  {"La identidad no ha sido verificada"}
                </p>
                <button
                  className="button is-danger is-outlined is-rounded"
                  onClick={() => {
                    this.setState({
                      mostrarFormulario: false,
                    });
                  }}
                >
                  Volver
                </button>
              </div>
            </React.Fragment>
          );
        }
      }
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    iniciarSesion: (datos) => dispatch({ type: INICIAR_SESION, data: datos }),
  };
};

const mapStateToProps = (state) => {
  return {
    usuario: state.user.usuario,
    estaLogueado: state.user.estaLogueado,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registrar);
