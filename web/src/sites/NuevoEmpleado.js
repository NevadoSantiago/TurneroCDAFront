import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
import Correcto from "../servicios/alertas/Correcto";
import { getRolesDeUsuario } from "../servicios/EmpleadoServices";
import { crearPersona, getAllSucursales } from "../servicios/AdminServices";

class NuevoEmpleado extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      correcto: null,
      roles: null,
      sucursales: null,
    };
  }

  getRoles = async () => {
    const { token } = this.props;
    const roles = await getRolesDeUsuario(token);
    this.setState({
      roles,
    });
  };

  getSucursales = async () => {
    const { token } = this.props;
    const sucursales = await getAllSucursales(token);
    this.setState({
      sucursales,
    });
  };

  componentDidMount() {
    this.getRoles();
    this.getSucursales();
  }

  createPersona = async (e) => {
    const { location, token } = this.props;
    const seCreo = await crearPersona(e, location, token);
    if (seCreo) {
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
    const { error, correcto, roles, sucursales } = this.state;

    if (roles !== null && sucursales !== null) {
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
            <form onSubmit={this.createPersona}>
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
                <label className="label">Sucursal</label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select is-fullwidth is-black">
                        <select name="sucursal">
                          {sucursales.map((s, i) => {
                            return (
                              <option value={s.sucursalId}>{s.nombre}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
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
    token: state.user.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevoEmpleado);
