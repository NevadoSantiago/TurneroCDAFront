import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { HeaderNoRegistrados } from "./tablas/NoRegistrados";
import DatosNoRegistrados from "./tablas/NoRegistrados";
import { getAllEmpleadosNoRegistrados } from "../../servicios/AdminServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

class NoRegistrados extends React.Component {
  constructor() {
    super();
    this.state = {
      personas: null,
    };
  }
  obtenerPersonas = async () => {
    const { token } = this.props;
    var personas = await getAllEmpleadosNoRegistrados(token);
    this.setState({
      personas,
    });
  };
  componentDidMount() {
    this.obtenerPersonas();
  }

  render() {
    const { personas } = this.state;

    if (personas != null) {
      if (personas.length === 0) {
        return (
          <div className="hero-body">
            <div className="columns is-mobile">
              <div className="column">
                <p className="title">Personas no registradas</p>
              </div>
              <div className="column" style={{ textAlign: "end" }}>
                <NavLink
                  to="/empleado/nuevo"
                  className="button is-black is-rounded is-outlined"
                  exact={true}
                  activeClassName="button is-black is-rounded is-outlined"
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  <span>Nuevo empleado</span>
                </NavLink>
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
                  <p className="title">Personas no registradas</p>
                </div>
                <div className="column" style={{ textAlign: "end" }}>
                  <NavLink
                    to="/empleado/nuevo"
                    className="button is-black is-rounded is-outlined"
                    exact={true}
                    activeClassName="button is-black is-rounded is-outlined"
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span>Nuevo empleado</span>
                  </NavLink>
                </div>
              </div>
              <table className="ui red table">
                <HeaderNoRegistrados />
                {personas.map((persona, i) => (
                  <DatosNoRegistrados
                    key={persona.idEmpleado}
                    persona={persona}
                    refresh={() => this.obtenerPersonas()}
                  />
                ))}
                <tfoot className="full-width">
                  <tr>
                    <th colSpan="6" style={{ textAlign: "center" }}>
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
  return {};
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoRegistrados);
