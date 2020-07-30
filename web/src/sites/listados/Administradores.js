import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DatosAdministradores from "./tablas/Administradores";
import { HeaderAdministradores } from "./tablas/Administradores";
import { getAdminstradoresDeSucursal } from "../../servicios/EmpleadoServices";

class Administradores extends React.Component {
  constructor() {
    super();
    this.state = {
      admins: null,
    };
  }

  getAdmins = async () => {
    const { sucursal } = this.props;
    const admins = await getAdminstradoresDeSucursal(sucursal.sucursalId);
    this.setState({
      admins,
    });
  };
  componentDidMount() {
    this.getAdmins();
  }

  render() {
    const { admins } = this.state;

    if (admins != null) {
      if (admins.length === 0) {
        return (
          <div className="hero-body">
            <div className="container" style={{ textAlign: "center" }}>
              <p className="subtitle">No hay administradores</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="hero-body">
            <label className="label">Administradores</label>
            <table className="ui red table">
              <HeaderAdministradores />
              {admins.map((a, i) => (
                <DatosAdministradores
                  admin={a}
                  refresh={() => this.getAdmins()}
                />
              ))}
              <tfoot className="full-width">
                <tr>
                  <th colspan="5" style={{ textAlign: "center" }}>
                    <div className="ui pagination menu">
                      <button
                        className="icon item"
                        style={{
                          backgroundColor: "white",
                          border: 0,
                        }}
                      >
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </button>
                      <button
                        className="item"
                        style={{
                          backgroundColor: "white",
                          border: 0,
                          fontFamily: "Nunito",
                        }}
                      >
                        1
                      </button>
                      <button
                        className="icon item"
                        style={{
                          backgroundColor: "white",
                          border: 0,
                        }}
                      >
                        <FontAwesomeIcon icon={faAngleRight} />
                      </button>
                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      }
    } else {
      return <p>Cargando..</p>;
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    iniciarSesion: (datos) => dispatch({ type: "INICIAR_SESION", data: datos }),
  };
};

const mapStateToProps = (state) => {
  return {
    recepcionistas: state.empleado.recepcionistas,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Administradores);
