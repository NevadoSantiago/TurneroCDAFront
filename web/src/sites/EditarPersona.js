import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
import Correcto from "../servicios/alertas/Correcto";
import { getRolesDeUsuario } from "../servicios/EmpleadoServices";
import {
  editarDatos,
  editarDatosNoRegistrado,
} from "../servicios/AdminServices";
import { ADMIN_GENERAL } from "../constantes/tiposUsuarios";

class EditarPersona extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      correcto: null,
      roles: null,
    };
  }
  mostrarOpcion = (opcion) => {
    return <option value={opcion.tipoId}>{opcion.detalle}</option>;
  };
  getRoles = async () => {
    const { token } = this.props;
    const roles = await getRolesDeUsuario(token);
    this.setState({
      roles,
    });
  };
  componentDidMount() {
    this.getRoles();
  }
  editarDatos = async (e) => {
    const { location, token, tipoUsuario } = this.props;

    if (tipoUsuario === ADMIN_GENERAL) {
      const seEdito = await editarDatosNoRegistrado(e, location, token);
      if (seEdito) {
        this.setState({
          correcto: "Se edito el usuario correctamente",
        });
        setTimeout(() => {
          this.props.history.goBack();
        }, 1500);
      } else {
        this.setState({
          error: "Hubo un error al editar",
        });
      }
    } else {
      const seEdito = await editarDatos(e, location, token);
      if (seEdito) {
        this.setState({
          correcto: "Se edito el usuario correctamente",
        });
        setTimeout(() => {
          this.props.history.goBack();
        }, 1500);
      } else {
        this.setState({
          error: "Hubo un error al editar",
        });
      }
    }
  };

  render() {
    const { error, correcto, roles } = this.state;
    const { location, tipoUsuario } = this.props;

    if (location.user != null && roles != null) {
      const { user } = location;
      if (tipoUsuario === ADMIN_GENERAL) {
        return (
          <React.Fragment>
            <div className="hero-body">
              <p className="title">{"Editar persona"}</p>
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
              }}
            >
              <form onSubmit={this.editarDatos}>
                <div className="field">
                  <label className="label">Nombre</label>
                  <div className="control">
                    <input
                      className="input is-black"
                      type="text"
                      placeholder={user.nombre}
                      name="nombre"
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Apellido</label>
                  <div className="control">
                    <input
                      className="input is-black"
                      type="text"
                      placeholder={user.apellido}
                      name="apellido"
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Rol</label>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <div className="select is-fullwidth is-black">
                          <select name="rol">
                            {roles.map((r, i) => {
                              if (location.user.rol === r.detalle) {
                                return (
                                  <option selected value={r.tipoId}>
                                    {r.detalle}
                                  </option>
                                );
                              } else {
                                return this.mostrarOpcion(r);
                              }
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button className="button is-primary" type="submit">
                      Confirmar
                    </button>
                  </div>
                </div>
                {error && <Error message={error} />}
                {correcto && <Correcto message={correcto} />}
              </form>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className="hero-body">
              <p className="title">{"Editar persona"}</p>
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
              }}
            >
              <form onSubmit={this.editarDatos}>
                <div className="field">
                  <label className="label">Nombre</label>
                  <div className="control">
                    <input
                      className="input is-black"
                      type="text"
                      placeholder={user.nombre}
                      name="nombre"
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Apellido</label>
                  <div className="control">
                    <input
                      className="input is-black"
                      type="text"
                      placeholder={user.apellido}
                      name="apellido"
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Correo electrónico</label>
                  <div className="control">
                    <input
                      className="input is-black"
                      type="text"
                      placeholder={user.mail}
                      name="mail"
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Rol</label>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <div className="select is-fullwidth is-black">
                          <select name="rol">
                            {roles.map((r, i) => {
                              if (location.user.rol === r.detalle) {
                                return (
                                  <option selected value={r.tipoId}>
                                    {r.detalle}
                                  </option>
                                );
                              } else {
                                return this.mostrarOpcion(r);
                              }
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button className="button is-primary" type="submit">
                      Confirmar
                    </button>
                  </div>
                </div>
                {error && <Error message={error} />}
                {correcto && <Correcto message={correcto} />}
              </form>
            </div>
          </React.Fragment>
        );
      }
    } else {
      return (
        <div className="hero-body">
          <div className="container" style={{ textAlign: "center" }}>
            <p className="subtitle">Cargando...</p>
          </div>
        </div>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    usuario: state.user.usuario,
    tipoUsuario: state.user.tipoUsuario,
    sucursal: state.user.sucursal,
    token: state.user.token,
    roles: state.empleado.roles,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditarPersona);
