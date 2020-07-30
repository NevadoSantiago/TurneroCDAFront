import React from "react";
import { connect } from "react-redux";
import { HeaderRecepcionistas } from "./tablas/Recepcionistas";
import DatosRecepcionistas from "./tablas/Recepcionistas";
import { RECEPCION } from "../../constantes/tiposUsuarios";
import { getEmpleadoBySucursalYRol } from "../../servicios/AdminServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class Recepcion extends React.Component {
  constructor() {
    super();
    this.state = {
      recargar: false,
      recepcionistas: null,
    };
  }
  getEmpleados = async (idSucursal, rol) => {
    var recepcionistas = await getEmpleadoBySucursalYRol(idSucursal, rol);
    this.setState({
      recepcionistas,
    });
  };
  componentDidMount() {
    const { sucursal } = this.props;
    this.getEmpleados(sucursal.sucursalId, RECEPCION);
  }

  render() {
    const { recepcionistas } = this.state;
    const { sucursal } = this.props;

    if (recepcionistas != null) {
      if (recepcionistas.length === 0) {
        return (
          <div className="hero-body">
            <p className="title">Recepción</p>
            <div className="container" style={{ textAlign: "center" }}>
              <p className="subtitle">No hay datos</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="hero-body">
            <p className="title">Recepción</p>
            <table className="ui red table">
              <HeaderRecepcionistas />
              {recepcionistas.map((e, i) => (
                <DatosRecepcionistas
                  empleado={e}
                  refresh={() =>
                    this.getEmpleados(sucursal.sucursalId, RECEPCION)
                  }
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
                          fontFamily: "Nunito",
                          backgroundColor: "white",
                          border: 0,
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
    sucursal: state.user.sucursal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recepcion);
