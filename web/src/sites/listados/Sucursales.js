import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { HeaderSucursales } from "./tablas/Sucursales";
import DatosSucursales from "./tablas/Sucursales";
import { getAllSucursales } from "../../servicios/AdminServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

class Sucursales extends React.Component {
  constructor() {
    super();
    this.state = {
      sucursales: null,
    };
  }
  obtenerSucursales = async () => {
    const { token } = this.props;
    var sucursales = await getAllSucursales(token);
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
      // TESTEAR QUE NO HAYA SUCURSALES
      /*setInterval( () => {
        this.setState({
          sucursales: []
        })
      }, 1000)*/
      if (sucursales.length === 0) {
        return (
          <div className="hero-body">
            <div className="columns is-mobile">
              <div className="column">
                <p className="title">Sucursales</p>
              </div>
              <div className="column" style={{ textAlign: "end" }}>
                <button className="button is-black is-rounded is-outlined">
                  <FontAwesomeIcon icon={faPlus} /> &nbsp; Nueva sucursal
                </button>
              </div>
            </div>
            <div className="container" style={{ textAlign: "center" }}>
              <p className="subtitle">No hay datos</p>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="hero-body">
              <div className="columns is-mobile">
                <div className="column">
                  <p className="title">Sucursales</p>
                </div>
                <div className="column" style={{ textAlign: "end" }}>
                  <NavLink
                    to="/sucursal/nuevo"
                    className="button is-black is-rounded is-outlined"
                    exact={true}
                    activeClassName="button is-black is-rounded is-outlined"
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span>Nueva sucursal</span>
                  </NavLink>
                </div>
              </div>
              <table className="ui red table">
                <HeaderSucursales />
                {sucursales.map((suc, i) => (
                  <DatosSucursales
                    key={suc.sucursalId}
                    sucursal={suc}
                    refresh={() => this.obtenerSucursales()}
                  />
                ))}
                <tfoot className="full-width">
                  <tr>
                    <th colSpan="5" style={{ textAlign: "center" }}>
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
          </div>
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
  return {
    iniciarSesion: (datos) => dispatch({ type: "INICIAR_SESION", data: datos }),
  };
};

const mapStateToProps = (state) => {
  return {
    recepcionistas: state.empleado.recepcionistas,
    token: state.user.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sucursales);
