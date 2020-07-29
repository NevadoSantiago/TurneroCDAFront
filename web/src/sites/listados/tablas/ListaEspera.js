import React from "react";
import { connect } from "react-redux";
import Error from "../../../servicios/alertas/Error";
import { getListaDeEspera } from "../../../servicios/EmpleadoServices";

class ListaEsperaPorEspecialidad extends React.Component {
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

  mostrarLista = (listaDeEspera, especialidad, itemsQty) => {
    if (itemsQty !== 0) {
      return (
        <table className="ui sortable green table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
            </tr>
          </thead>
          <tbody>
            {listaDeEspera.map((p, i) => {
              if (p.especialidad === especialidad.nombre) {
                return (
                  <tr>
                    <td>
                      <b>{`${
                        p.nombre === null ? "😢 no hay dato" : p.nombre
                      }`}</b>
                    </td>
                    <td>
                      <b>{`${
                        p.apellido === null ? "😢 no hay dato" : p.apellido
                      }`}</b>
                    </td>
                    <td>
                      <b>{`${
                        p.nroDocumento === null
                          ? "😢 no hay dato"
                          : p.nroDocumento
                      }`}</b>
                    </td>
                  </tr>
                );
              }
              return p;
            })}
          </tbody>
        </table>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <p className="subtitle">
            No hay personas
            <span role="img" aria-label="sad">
              😢
            </span>
          </p>
        </div>
      );
    }
  };

  componentDidMount() {
    this.getListaDeEspera();
    this.interval = setInterval(() => this.getListaDeEspera(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { listaDeEspera, error } = this.state;
    const { location } = this.props;
    const { especialidad, sucursal, count } = location;
    if (
      sucursal != null &&
      listaDeEspera != null &&
      especialidad != null &&
      count != null
    ) {
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
                display: "inline-table",
                textAlign: "left",
                minWidth: "-webkit-fill-available",
              }}
            >
              <p className="title" style={{ margin: 0 }}>
                {especialidad.nombre}
              </p>
              {this.mostrarLista(listaDeEspera, especialidad, count)}
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaEsperaPorEspecialidad);
