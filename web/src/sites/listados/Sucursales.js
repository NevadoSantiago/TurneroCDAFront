import React from "react";
import { connect } from "react-redux";
import { HeaderSucursales } from "./tablas/Sucursales";
import DatosSucursales from "./tablas/Sucursales";
import { getAllSucursales } from "../../servicios/AdminServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class Sucursales extends React.Component {
  constructor() {
    super();
    this.state = {
      sucursales: null,
    };
  }
  obtenerSucursales = async () => {
    var sucursales = await getAllSucursales();
    this.setState({
      sucursales,
    });
  };
  componentDidMount() {
    this.obtenerSucursales();
  }

  render() {
    const { sucursales } = this.state;

    if (sucursales != null) {
      if (sucursales.length === 0) {
        return (
          <div className="hero-body">
            <p className="title">Sucursales</p>
            <div className="container" style={{ textAlign: "center" }}>
              <p className="subtitle">No hay datos</p>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div>
              <p className="title">Los botones todavia no funcionan</p>
            </div>
            <div className="hero-body">
              <p className="title">Sucursales</p>
              <table className="ui red table">
                <HeaderSucursales />
                {sucursales.map((suc, i) => (
                  <DatosSucursales sucursal={suc} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Sucursales);
