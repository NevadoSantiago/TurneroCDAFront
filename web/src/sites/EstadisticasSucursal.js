import React from "react";
import { connect } from "react-redux";
import { Pie, Bar, defaults } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { getListaDeEspera } from "../servicios/EmpleadoServices";

class EstadisticasSucursal extends React.Component {
  constructor() {
    super();
    this.state = {
      dataEspecialidades: null,
      listaDeEspera: null,
      loadingStats: true,
    };
  }

  getListaDeEspera = async () => {
    const { location } = this.props;
    const { sucursal } = location;
    const listaDeEspera = await getListaDeEspera(sucursal.sucursalId);
    this.setState({
      listaDeEspera,
    });

    return listaDeEspera;
  };

  checkIfReservaHasEspecialidad = async (especialidad) => {
    const { location } = this.props;
    const { sucursal } = location;

    const listaDeEspera = await getListaDeEspera(sucursal.sucursalId);
    var count = 0;

    await listaDeEspera.map((persona) => {
      if (persona.especialidad.indexOf(especialidad) != -1) {
        count++;
      }
    });

    return count;
  };

  getDataEspecialidades = async () => {
    const { especialidades } = this.props;
    const { dataEspecialidades } = this.state;

    var result = {
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
      labels: [],
    };

    if (especialidades != null) {
      var length = Object.keys(especialidades).length;

      await especialidades.map(async (especialidad, i) => {
        const value = await this.checkIfReservaHasEspecialidad(
          especialidad.nombre
        );
        console.log(especialidad.nombre + " - " + value);
        result.datasets[0].data.push(value);
        result.datasets[0].backgroundColor.push(
          "hsl(" +
            (length * i * 10).toString() +
            ", 50%, " +
            ((length - i + 6) * 8).toString() +
            "%)"
        );
        result.labels.push(especialidad.nombre);
      });

      if (dataEspecialidades === null) {
        this.setState({
          dataEspecialidades: result,
        });
      }
    }
  };

  componentDidMount() {
    this.getListaDeEspera();
    this.interval = setInterval(() => this.getListaDeEspera(), 10000);
    setInterval(() => {
      this.setState({
        loadingStats: false,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { location, especialidades } = this.props;
    const { dataEspecialidades, listaDeEspera, loadingStats } = this.state;

    defaults.global.defaultFontFamily = "Nunito";
    defaults.global.defaultFontStyle = "bold";

    this.getDataEspecialidades();

    if (
      location.sucursal != null &&
      especialidades != null &&
      dataEspecialidades != null &&
      listaDeEspera != null
    ) {
      const { sucursal } = location;
      if (loadingStats) {
        return (
          <React.Fragment>
            <div className="hero-body">
              <p className="title">{"Estadísticas"}</p>
              <p className="subtitle">
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
                marginBottom: "15px",
              }}
            >
              <button
                className="button is-rounded is-danger is-outlined"
                style={{
                  float: "right",
                  marginTop: "-5px",
                  marginRight: "-5px",
                }}
              >
                <span class="icon is-small">
                  <FontAwesomeIcon icon={faFilePdf} />
                </span>
                <span>Generar reporte PDF</span>
              </button>
              <p className="subtitle">
                {"Sucursal: "}
                <b>{sucursal.nombre}</b>
                <br />
                {"Dirección: "}
                {sucursal.direccion}
              </p>
              <div className="columns">
                <div className="column is-6">
                  <div className="ui placeholder">
                    <div className="header">
                      <div className="medium line"></div>
                    </div>
                    <div className="image" style={{ height: "250px" }}></div>
                  </div>
                </div>
                <div className="column is-6">
                  <div className="ui placeholder">
                    <div className="header">
                      <div className="medium line"></div>
                    </div>
                    <div className="image" style={{ height: "250px" }}></div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-6">
                  <div className="ui placeholder">
                    <div className="header">
                      <div className="medium line"></div>
                    </div>
                    <div className="image" style={{ height: "250px" }}></div>
                  </div>
                </div>
                <div className="column is-6">
                  <div className="ui placeholder">
                    <div className="header">
                      <div className="medium line"></div>
                    </div>
                    <div className="image" style={{ height: "250px" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className="hero-body">
              <p className="title">{"Estadísticas"}</p>
              <p className="subtitle">
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
                marginBottom: "15px",
              }}
            >
              <button
                className="button is-rounded is-danger is-outlined"
                style={{
                  float: "right",
                  marginTop: "-5px",
                  marginRight: "-5px",
                }}
              >
                <span class="icon is-small">
                  <FontAwesomeIcon icon={faFilePdf} />
                </span>
                <span>Generar reporte PDF</span>
              </button>
              <p className="subtitle">
                {"Sucursal: "}
                <b>{sucursal.nombre}</b>
                <br />
                {"Dirección: "}
                {sucursal.direccion}
              </p>
              <div className="columns">
                <div className="column is-6" style={{ textAlign: "center" }}>
                  <p className="subtitle">
                    <b>{"Turnos según especialidad"}</b>
                  </p>
                  <Pie
                    data={dataEspecialidades}
                    width={10}
                    height={5}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      legend: {
                        position: "left",
                      },
                    }}
                  />
                </div>
                <div className="column is-6" style={{ textAlign: "center" }}>
                  <p className="subtitle">
                    <b>{"Gráfico 2"}</b>
                  </p>
                  <Pie
                    data={{
                      datasets: [
                        {
                          data: [10, 20, 30],
                          backgroundColor: ["lightblue", "lavender", "pink"],
                        },
                      ],
                      // These labels appear in the legend and in the tooltips when hovering different arcs
                      labels: ["Light blue", "Lavender", "Pink"],
                    }}
                    width={10}
                    height={5}
                    options={{ responsive: true, maintainAspectRatio: true }}
                  />
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-9" style={{ textAlign: "center" }}>
                  <p className="subtitle">
                    <b>{"Gráfico 3"}</b>
                  </p>
                  <Bar
                    data={{
                      labels: [
                        "Red",
                        "Blue",
                        "Yellow",
                        "Green",
                        "Purple",
                        "Orange",
                      ],
                      datasets: [
                        {
                          label: "# of Votes",
                          data: [12, 19, 3, 5, 2, 3],
                          backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                          ],
                          borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    width={10}
                    height={5}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                    }}
                  />
                </div>
              </div>
            </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EstadisticasSucursal);
