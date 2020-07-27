import React from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

class EstadisticasSucursal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { location } = this.props;

    if (location.sucursal != null) {
      const { sucursal } = location;
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
              style={{ float: "right", marginTop: "-5px", marginRight: "-5px" }}
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
                <p>{"Gráfico 1"}</p>
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
              <div className="column is-6" style={{ textAlign: "center" }}>
                <p>{"Gráfico 2"}</p>
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
          </div>
        </React.Fragment>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EstadisticasSucursal);
