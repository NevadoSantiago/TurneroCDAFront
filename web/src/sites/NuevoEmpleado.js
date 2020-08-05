import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
import Correcto from "../servicios/alertas/Correcto";
import { getRolesDeUsuario } from "../servicios/EmpleadoServices";
import { editarDatos } from "../servicios/AdminServices";

class NuevoEmpleado extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      correcto: null,
      roles: null,
    };
  }

  getRoles = async () => {
    const roles = await getRolesDeUsuario();
    this.setState({
      roles,
    });
  };

  componentDidMount() {
    this.getRoles();
  }

  createPersona = async (e) => {
    const { location } = this.props;
    const seEdito = await editarDatos(e, location);
    if (seEdito) {
      this.setState({
        correcto: "Se creó al empleado correctamente",
      });
      setTimeout(() => {
        this.props.history.goBack();
      }, 1500);
    } else {
      this.setState({
        error: "Hubo un error al crear al empleado",
      });
    }
  };

  render() {
    const { error, correcto, roles } = this.state;

    if (roles !== null) {
      return (
        <div>
          <div className="hero-body">
            <div className="columns is-mobile">
              <div className="column">
                <p className="title">Nuevo empleado</p>
              </div>
            </div>
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
                    placeholder="Nombre"
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
                    placeholder="Apellido"
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
                    placeholder="Correo electrónico"
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
                            return (
                              <option value={r.tipoId}>{r.detalle}</option>
                            );
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
        </div>
      );
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
    roles: state.empleado.roles,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevoEmpleado);
