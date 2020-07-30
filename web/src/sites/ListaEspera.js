import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
//import { NavLink } from "react-router-dom";
import {
  getListaDeEspera,
  getListaDeEsperaAgrupada,
} from "../servicios/EmpleadoServices";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

class ListaEspera extends React.Component {
  constructor() {
    super();
    this.state = {
      listaDeEspera: null,
      error: null,
    };
  }

  getListaDeEspera = async () => {
    const { location } = this.props;
    const { sucursal } = location;
    const listaDeEspera = await getListaDeEspera(sucursal.sucursalId);
    this.setState({
      listaDeEspera: listaDeEspera,
    });
  };

  getListaDeEsperaAgrupada = async () => {
    const { location } = this.props;
    const { sucursal } = location;
    const listaDeEsperaAgrupada = await getListaDeEsperaAgrupada(
      sucursal.sucursalId
    );
    this.setState({
      listaDeEspera: listaDeEsperaAgrupada,
    });
  };

  componentDidMount() {
    this.getListaDeEsperaAgrupada();
    this.interval = setInterval(() => this.getListaDeEsperaAgrupada(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { listaDeEspera, error } = this.state;
    const { location, especialidades } = this.props;
    debugger
    if (
      location.sucursal != null &&
      listaDeEspera != null &&
      especialidades != null
    ) {
      console.log(listaDeEspera);
      const { sucursal } = location;
      if (error) {
        return (
          <React.Fragment>
            <div className="hero-body">
              <p className="title">{"Lista de espera"}</p>
              <p className="subtitle">
                {sucursal.nombre + " - " + sucursal.direccion}
                &nbsp;
                <b>{"(" + sucursal.sucursalId + ")"}</b>
              </p>
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
              }}
            >
              <Error message={error} />
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className="hero-body">
              <p className="title">{"Lista de espera"}</p>
              <p className="subtitle">
                {sucursal.nombre + " - " + sucursal.direccion}
                &nbsp;
                <b>{"(" + sucursal.sucursalId + ")"}</b>
              </p>
            </div>
            <div className="container">
              <span
                className="subtitle"
                style={{
                  marginLeft: "20px",
                }}
              >
                {"Especialidad"}
                &nbsp;
              </span>
              <span
                className="subtitle"
                style={{
                  margin: "-30px 15px 10px 0px",
                  textAlign: "right",
                  display: "inherit",
                }}
              >
                {"En espera"}
                &nbsp;
              </span>
            </div>
            {especialidades.map((especialidad, index) => {
              var count = 0;
              listaDeEspera.map((p, i) => {
                if (p.especialidad === especialidad.nombre) {
                  count = p.cantidadEspera;
                }

                return count;
              });
              return (
                /*<NavLink
                  to={{
                    /*pathname: "/lista/especialidad",
                    sucursal: sucursal,
                    especialidad: especialidad,
                    count: count,
                  }}
                  className="container"
                  exact={true}
                  activeClassName="button is-rounded is-outlined"
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    marginRight: "15px",
                    marginLeft: "15px",
                    marginBottom: "15px",
                    display: "inline-table",
                    textAlign: "left",
                    minWidth: "-webkit-fill-available",
                  }}
                >
                  <p className="title" style={{ margin: 0 }}>
                    {especialidad.nombre}
                  </p>
                  <p
                    className="title"
                    style={{
                      margin: 0,
                      display: "table-cell",
                      textAlign: "right",
                    }}
                  >
                    {count}&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faChevronRight} />
                  </p>
                </NavLink>*/
                <div
                  className="container"
                  key={index}
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    marginRight: "15px",
                    marginLeft: "15px",
                    marginBottom: "15px",
                    display: "inline-table",
                    textAlign: "left",
                    minWidth: "-webkit-fill-available",
                  }}
                >
                  <p className="title" style={{ margin: 0 }}>
                    {especialidad.nombre}
                  </p>
                  <p
                    className="title"
                    style={{
                      margin: 0,
                      display: "table-cell",
                      textAlign: "right",
                    }}
                  >
                    {count}&nbsp;
                  </p>
                </div>
              );
            })}
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
    especialidades: state.empleado.especialidades,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListaEspera);
