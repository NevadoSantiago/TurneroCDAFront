import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
//import { NavLink } from "react-router-dom";
import { getListaDeEsperaAgrupada } from "../servicios/EmpleadoServices";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

var cantidadDeGenteAnterior = [];
var cantidadDeGente = [];
var highlightNuevoEnEspera = [];
var highlightUnoMenosEnEspera = [];

class ListaEspera extends React.Component {
  constructor() {
    super();
    this.state = {
      listaDeEspera: null,
      error: null,
      cantidadDeGenteAnterior: [],
      cantidadDeGenteActual: [],
      settingCantidadDeGente: true,
      settingEspecialidadesQty: true,
      updatingCantidadDeGente: false,
      especialidadesQty: null,
    };
  }

  setCantidadDeGente = (cantidad) => {
    this.setState({
      cantidadDeGenteActual: cantidad,
    });
  };

  getDiferencias = (especialidad, cantidadDeGenteAnterior) => {
    const { cantidadDeGenteActual } = this.state;
    const { especialidades } = this.props;

    especialidades.map((esp, i) => {
      if (esp.especialidadId === especialidad.especialidadId) {
        if (
          cantidadDeGenteAnterior[i] !== undefined &&
          cantidadDeGenteActual[i] !== undefined
        ) {
          if (cantidadDeGenteAnterior[i].qty !== cantidadDeGenteActual[i].qty) {
            // CAMBIÓ UN VALOR
            if (
              cantidadDeGenteActual[i].qty - cantidadDeGenteAnterior[i].qty >
              0
            ) {
              highlightNuevoEnEspera.push(esp.especialidadId);
            } else {
              highlightUnoMenosEnEspera.push(esp.especialidadId);
            }
          } else {
            // NO CAMBIÓ NADA
          }
        } else {
          // NO HAY DATA
        }
      }

      return especialidad.especialidadId;
    });

    return cantidadDeGenteAnterior;
  };

  getListaDeEsperaAgrupada = async () => {
    const { location } = this.props;
    const { sucursal } = location;

    const listaDeEsperaAgrupada = await getListaDeEsperaAgrupada(
      sucursal.sucursalId
    );

    this.setState({
      listaDeEspera: listaDeEsperaAgrupada,
      settingCantidadDeGente: true,
    });
  };

  componentDidMount() {
    this.getListaDeEsperaAgrupada();
    this.interval = setInterval(() => {
      this.getListaDeEsperaAgrupada();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      listaDeEspera,
      error,
      settingCantidadDeGente,
      settingEspecialidadesQty,
      cantidadDeGenteActual,
    } = this.state;
    const { location, especialidades } = this.props;

    //debugger;

    cantidadDeGenteAnterior = cantidadDeGente;
    highlightNuevoEnEspera = [];
    highlightUnoMenosEnEspera = [];
    var _cantidadDeGente = [];

    if (
      location.sucursal != null &&
      listaDeEspera != null &&
      especialidades != null
    ) {
      const { sucursal } = location;

      cantidadDeGente = cantidadDeGenteActual;

      if (settingEspecialidadesQty) {
        this.setState({
          especialidadesQty: Object.keys(especialidades).length,
          settingEspecialidadesQty: false,
        });
      }

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
            {}
            {especialidades.map((especialidad, index) => {
              var count = 0;
              var length = Object.keys(especialidades).length;
              listaDeEspera.map((p, i) => {
                if (p.especialidad === especialidad.nombre) {
                  count = p.cantidadEspera;
                  _cantidadDeGente.push({
                    id: especialidad.especialidadId,
                    qty: p.cantidadEspera,
                  });
                }

                return count;
              });

              if (count === 0) {
                _cantidadDeGente.push({
                  id: especialidad.especialidadId,
                  qty: count,
                });
              }

              if (settingCantidadDeGente) {
                this.setCantidadDeGente(_cantidadDeGente);
                this.setState({
                  settingCantidadDeGente: false,
                });
              }

              this.getDiferencias(especialidad, cantidadDeGenteAnterior);

              return (
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
                    borderTop: "solid",
                    borderWidth: "thick",
                    borderColor:
                      "hsl(" +
                      (length * index * 10).toString() +
                      ", 50%, " +
                      ((length - index + 6) * 8).toString() +
                      "%)",
                  }}
                >
                  <div className="columns is-mobile">
                    <div className="column" style={{ padding: "1rem" }}>
                      <p className="title">{especialidad.nombre}</p>
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        margin: "-10px",
                        flexDirection: "row-reverse",
                      }}
                    >
                      <div
                        className={`
                          ${
                            highlightNuevoEnEspera.includes(
                              especialidad.especialidadId
                            )
                              ? "highlighted"
                              : highlightUnoMenosEnEspera.includes(
                                  especialidad.especialidadId
                                )
                              ? "highlighted-error"
                              : "highlight-whitesmoke"
                          }
                          `}
                        style={{
                          alignSelf: "center",
                          textAlign: "center",
                          borderRadius: "500px",
                          width: "40%",
                          padding: "inherit",
                          MozTransition: "all 0.5s ease-out",
                          OTransition: "all 0.5s ease-out",
                          WebkitTransition: "all 0.5s ease-out",
                          transition: "all 0.5s ease-out",
                        }}
                      >
                        <p
                          className="title"
                          style={{
                            marginTop: "1px",
                          }}
                        >
                          {count}
                        </p>
                      </div>
                    </div>
                  </div>
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
