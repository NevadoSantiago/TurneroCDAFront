import React from "react";
import { connect } from "react-redux";
import { Pie, Bar, defaults } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import {
  getListaDeEspera,
  getTiempoDeEsperaPromedio,
} from "../servicios/EmpleadoServices";

class EstadisticasSucursal extends React.Component {
  constructor() {
    super();
    this.state = {
      turnosSegunEspecialidad: null,
      tiempoDeEsperaPromedio: null,
      listaDeEspera: null,
      loadingStats: true,
    };
  }

  getListaDeEspera = async () => {
    const { token, sucursal } = this.props;
    const listaDeEspera = await getListaDeEspera(sucursal.sucursalId, token);
    this.setState({
      listaDeEspera,
    });

    return listaDeEspera;
  };

  getTiempoDeEsperaPromedio = async (especialidad) => {
    const { token, sucursal } = this.props;

    const tiempoDeEspera = await getTiempoDeEsperaPromedio(
      especialidad.especialidadId,
      sucursal.sucursalId,
      token
    );

    return tiempoDeEspera;
  };

  checkIfReservaHasEspecialidad = async (especialidad) => {
    const { token, sucursal } = this.props;

    const listaDeEspera = await getListaDeEspera(sucursal.sucursalId, token);
    var count = 0;

    await listaDeEspera.map((persona) => {
      if (persona.especialidad.indexOf(especialidad) !== -1) {
        count++;
      }
      return count;
    });

    return count;
  };

  getDataEspecialidades = async () => {
    const { especialidades } = this.props;
    const {
      turnosSegunEspecialidad,
      tiempoDeEsperaPromedio,
      loadingStats,
    } = this.state;

    var _turnosSegunEspecialidad = {
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
      labels: [],
    };

    var _tiempoDeEsperaPromedio = {
      datasets: [
        {
          label: "Tiempo (s)",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
      labels: [],
    };

    if (especialidades !== null && loadingStats === true) {
      console.log("--- TURNOS SEGÚN ESPECIALIDAD ---");
      var length = Object.keys(especialidades).length;

      await especialidades.map(async (especialidad, i) => {
        const tiempo = await this.getTiempoDeEsperaPromedio(especialidad);
        //console.log(especialidad.nombre + " - " + tiempo + "s");

        const value = await this.checkIfReservaHasEspecialidad(
          especialidad.nombre
        );

        _tiempoDeEsperaPromedio.datasets[0].data.push(tiempo);
        _tiempoDeEsperaPromedio.datasets[0].backgroundColor.push(
          "hsl(" +
            (length * i * 10).toString() +
            ", 50%, " +
            ((length - i + 6) * 8).toString() +
            "%)"
        );
        _tiempoDeEsperaPromedio.datasets[0].borderColor.push(
          "hsl(" +
            (length * i * 10).toString() +
            ", 100%, " +
            ((length - i + 6) * 8).toString() +
            "%)"
        );
        _tiempoDeEsperaPromedio.labels.push(especialidad.nombre);

        console.log(especialidad.nombre + " - " + value);
        _turnosSegunEspecialidad.datasets[0].data.push(value);
        _turnosSegunEspecialidad.datasets[0].backgroundColor.push(
          "hsl(" +
            (length * i * 10).toString() +
            ", 50%, " +
            ((length - i + 6) * 8).toString() +
            "%)"
        );
        _turnosSegunEspecialidad.labels.push(especialidad.nombre);
      });

      if (turnosSegunEspecialidad === null || tiempoDeEsperaPromedio === null) {
        this.setState({
          turnosSegunEspecialidad: _turnosSegunEspecialidad,
          tiempoDeEsperaPromedio: _tiempoDeEsperaPromedio,
        });
      }
    }
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        loadingStats: false,
      });
    }, 1000);
  }

  generatePDF(e) {
    e.preventDefault();

    function addElementHTML(parentId, elementTag, elementId, html) {
      // Adds an element to the document
      var p = document.getElementById(parentId);
      var newElement = document.createElement(elementTag);
      newElement.setAttribute("id", elementId);
      newElement.async = true;
      newElement.innerHTML = html;
      p.appendChild(newElement);
    }

    var js = `
    html2canvas(document.getElementById("capture"), {
      dpi: 1600, // Set to 1600 DPI
      scale: 0.78, // Adjusts your resolution
    }).then(function(canvas) {
      console.log('Adentro')
      var w = document.getElementById("root").offsetWidth;
      var h = document.getElementById("root").offsetHeight;
      var img = canvas.toDataURL("image/jpeg");
      var doc = new jsPDF('p', 'mm', 'a4');
      doc.addImage({imageData: img, format: 'JPEG', compression: 'NONE'})
      doc.save('descarga.pdf');
    });
    `;

    addElementHTML("scripts", "script", "html2canvasJS", js);
  }

  render() {
    const { especialidades, sucursal } = this.props;
    const {
      turnosSegunEspecialidad,
      tiempoDeEsperaPromedio,
      loadingStats,
    } = this.state;

    defaults.global.defaultFontFamily = "Nunito";
    defaults.global.defaultFontStyle = "bold";

    this.getDataEspecialidades();

    if (
      sucursal != null &&
      especialidades != null &&
      turnosSegunEspecialidad != null &&
      tiempoDeEsperaPromedio != null
    ) {
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
                <span className="icon is-small">
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
            <div id="capture">
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
                  data-html2canvas-ignore="true"
                  onClick={(e) => this.generatePDF(e)}
                  style={{
                    float: "right",
                    marginTop: "-5px",
                    marginRight: "-5px",
                  }}
                >
                  <span className="icon is-small">
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
                      data={turnosSegunEspecialidad}
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
                    {/*<p className="subtitle">
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
                    />*/}
                    <p className="subtitle">
                      <b>{"Tiempo de espera promedio por especialidad"}</b>
                    </p>
                    <Bar
                      data={tiempoDeEsperaPromedio}
                      width={10}
                      height={5}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                      }}
                    />
                  </div>
                </div>
                <div className="columns is-centered">
                  <div
                    className="column is-9"
                    style={{ textAlign: "center" }}
                  ></div>
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
    token: state.user.token,
    sucursal: state.user.sucursal,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EstadisticasSucursal);
