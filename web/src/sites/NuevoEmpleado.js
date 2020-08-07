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
      nombre: null,
      apellido: null,
      codigo: null,
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

  addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute("id", elementId);
    newElement.async = true;
    newElement.innerHTML = html;
    p.appendChild(newElement);
  }

  componentDidMount() {
    this.getRoles();
    this.getSucursales();
  }

  createPersona = async (e) => {
    const { location, token } = this.props;
    const seCreo = await crearPersona(e, location, token);
    var codigo = seCreo[1].shift();
    var nombre = seCreo[2];
    var apellido = seCreo[3];
    if (seCreo[0]) {
      this.setState({
        correcto: "Se creó al empleado correctamente",
        codigo,
        nombre,
        apellido,
      });

      var minimodal = `
      $(document).ready(function(){
        $('.mini.modal').modal('show');
      })
      `;

      if (document.getElementById("minimodal") !== null) {
        var element = document.getElementById("minimodal");
        element.parentNode.removeChild(element);
      }

      var modalsqty = Array.prototype.slice.call(
        document.getElementsByClassName("modal"),
        0
      );

      if (modalsqty.length > 1) {
        modalsqty[1].remove();
      }

      this.addElement("scripts", "script", "minimodal", minimodal);
      setTimeout(() => {
        this.props.history.goBack();
      }, 3000);
    } else {
      this.setState({
        error: "Hubo un error al crear al empleado",
      });
    }
  };

  render() {
    const {
      error,
      correcto,
      roles,
      sucursales,
      codigo,
      nombre,
      apellido,
    } = this.state;

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
                            if (
                              r.detalle.includes("ADMIN") ||
                              r.detalle.includes("admin")
                            ) {
                              return (
                                <option value={r.tipoId}>{r.detalle}</option>
                              );
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
            <div
              className="ui mini modal"
              style={{ height: "fit-content", position: "relative" }}
              id="uimodal"
            >
              <div className="header" style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Nunito" }}>Código de seguridad</p>
              </div>
              <div
                className="content is-info"
                style={{ textAlign: "center", marginBottom: 0 }}
              >
                <div className="description is-family-primary">
                  <p className="subtitle">
                    {"El código de seguridad para " +
                      nombre +
                      " " +
                      apellido +
                      " es"}
                  </p>
                  <br />
                  <p
                    className="title"
                    style={{ fontSize: "3.5rem" }}
                    id="codigo"
                  >
                    {codigo}
                  </p>
                </div>
              </div>
              <div className="actions" style={{ padding: "15px !important" }}>
                <button className="ui positive approve button">OK</button>
              </div>
            </div>
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
