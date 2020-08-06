import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
import { INICIAR_SESION } from "../constantes/actionRedux";
import { URL_API } from "../constantes/urlApi";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
  }

  validateCredentials = (usuario, password) => {
    if (!usuario || !password) {
      return "Datos incorrectos";
    }
  };

  signIn = (usuario, password) => {
    const error = this.validateCredentials(usuario, password);
    if (error) {
      return error;
    }
  };

  login = async (e) => {
    const { iniciarSesion } = this.props;
    e.preventDefault();
    const usuario = e.target.elements.usuario.value;
    const password = e.target.elements.password.value;

    const error = this.signIn(usuario, password);
    if (error) {
      this.setState({
        error,
      });
      return false;
    } else {
      const url = URL_API + "/api/usuario/auth";
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          usuario: usuario,
          contrasena: password,
        }),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((myJson) => {
            iniciarSesion(myJson);
            localStorage.setItem("token", myJson.token);
          });
        } else {
          this.setState({ error: "Datos incorrectos" });
        }
      });
    }
  };
  verificarExisteTokenAndLogueo = async () => {
    const { iniciarSesion } = this.props;
    const token = localStorage.getItem("token");
    const url = URL_API + "/api/usuario/auth/token";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((myJson) => {
          iniciarSesion(myJson);
        });
      } else {
        this.setState({ error: response.text() });
      }
    });
  };

  render() {
    const { error } = this.state;
    const { estaLogueado } = this.props;
    if (estaLogueado) {
      this.props.history.push("/home");
    }
    if (localStorage.getItem("token")) {
      this.verificarExisteTokenAndLogueo();
      return <p>Cargando..</p>;
    }
    return (
      <div className="hero-body">
        <p className="title">Iniciar sesión</p>
        <form onSubmit={this.login}>
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
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-primary" type="submit">
                Ingresar
              </button>
            </div>
          </div>
          {error && <Error message={error} />}
        </form>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
