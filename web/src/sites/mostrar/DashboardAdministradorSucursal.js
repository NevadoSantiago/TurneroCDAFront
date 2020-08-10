import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faQrcode,
  faChartPie,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  getEspecialidadesPorSucursal,
  getCantGenteEnSucursal,
} from "../../servicios/EmpleadoServices";
import {
  SET_ESPECIALIDADES,
  SET_CANTIDAD_GENTE,
} from "../../constantes/actionRedux";

class DashboardAdministradorSucursal extends React.Component {
  constructor() {
    super();
    this.state = {
      highlightNuevoEnEspera: false,
      highlightUnoMenosEnEspera: false,
      cantidadGente: -1,
    };
  }

  getEspecialidades = async (idSucursal) => {
    const { setEspecialidades, token } = this.props;
    const especialidades = await getEspecialidadesPorSucursal(
      idSucursal,
      token
    );
    setEspecialidades(especialidades);
  };

  getCantidadDeGenteEnEspera = async () => {
    const { sucursal, token } = this.props;
    const { cantidadGente } = this.state;
    const cant = await getCantGenteEnSucursal(sucursal.sucursalId, token);
    if (cant !== cantidadGente) {
      if (cant > cantidadGente) {
        this.setState({
          cantidadGente: cant,
          highlightNuevoEnEspera: true,
          highlight: true,
        });
        setInterval(
          () =>
            this.setState({
              highlightNuevoEnEspera: false,
              highlight: false,
            }),
          3000
        );
      } else {
        this.setState({
          cantidadGente: cant,
          highlightUnoMenosEnEspera: true,
          highlight: true,
        });
        setInterval(
          () =>
            this.setState({
              highlightUnoMenosEnEspera: false,
              highlight: false,
            }),
          3000
        );
      }
    }
  };

  componentDidMount() {
    const { sucursal } = this.props;
    if (sucursal !== null) {
      this.getCantidadDeGenteEnEspera();
      this.interval = setInterval(
        () => this.getCantidadDeGenteEnEspera(),
        10000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { usuario, sucursal } = this.props;
    const {
      highlightNuevoEnEspera,
      highlightUnoMenosEnEspera,
      cantidadGente,
    } = this.state;
    if (sucursal == null) {
      return (
        <div className="hero-body">
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
              textAlign: "center",
            }}
          >
            <p className="title">Usted no posee sucursales a cargo</p>
          </div>
        </div>
      );
    } else if (usuario != null) {
      return (
        <React.Fragment>
          <div className="hero-body">
            <p className="title">{"Hola " + usuario}</p>
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
            <div className="columns">
              <div className="column" style={{ alignSelf: "center" }}>
                <div>
                  <p className="title">{sucursal.nombre}</p>
                  <p className="subtitle">{sucursal.direccion}</p>
                </div>
              </div>
              <div
                className="column"
                style={{ display: "flex", margin: "-10px" }}
              >
                <div
                  className={`${
                    highlightNuevoEnEspera
                      ? "highlighted"
                      : highlightUnoMenosEnEspera
                      ? "highlighted-error"
                      : "highlight-whitesmoke"
                  }`}
                  style={{
                    //backgroundColor: 'whitesmoke',
                    textAlign: "end",
                    borderTopLeftRadius: "500px",
                    borderBottomLeftRadius: "500px",
                    width: "50%",
                    padding: "10px",
                    MozTransition: "all 0.5s ease-out",
                    OTransition: "all 0.5s ease-out",
                    WebkitTransition: "all 0.5s ease-out",
                    transition: "all 0.5s ease-out",
                  }}
                >
                  <p className="subtitle">{"En espera"}</p>
                  <p className="title">{cantidadGente}</p>
                </div>
                <div
                  style={{
                    backgroundColor: "whitesmoke",
                    textAlign: "start",
                    borderTopRightRadius: "500px",
                    borderBottomRightRadius: "500px",
                    width: "50%",
                    padding: "10px",
                    borderLeft: "dashed",
                    borderColor: "#CCCCCC",
                  }}
                >
                  <p className="subtitle">{"Atendidos"}</p>
                  <p className="title">{"1"}</p>
                </div>
              </div>
            </div>
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
              textAlign: "center",
            }}
          >
            <div style={{ margin: -5 }}>
              <button
                className="button is-rounded is-black is-outlined"
                style={{ margin: 5 }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faQrcode} />
                </span>
                <span>Escanear código QR</span>
              </button>
              <NavLink
                to={{ pathname: "/lista", sucursal: sucursal }}
                onClick={() => this.getEspecialidades(sucursal.sucursalId)}
                className="button is-rounded is-outlined"
                exact={true}
                activeClassName="button is-rounded is-outlined"
                style={{ margin: 5 }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faUsers} />
                </span>
                <span>Lista de espera</span>
              </NavLink>
              <NavLink
                to="/empleado/nuevo"
                className="button is-rounded is-outlined"
                exact={true}
                activeClassName="button is-rounded is-outlined"
                style={{ margin: 5 }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <span>Nuevo empleado</span>
              </NavLink>
              <NavLink
                to={{ pathname: "/estadisticas", sucursal: sucursal }}
                onClick={() => this.getEspecialidades(sucursal.sucursalId)}
                className="button is-rounded is-outlined"
                exact={true}
                activeClassName="button is-rounded is-outlined"
                style={{ margin: 5 }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faChartPie} />
                </span>
                <span>Ver estadísticas</span>
              </NavLink>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <p>Cargando...</p>;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEspecialidades: (datos) =>
      dispatch({ type: SET_ESPECIALIDADES, data: datos }),
    setCantidadDeGente: (datos) =>
      dispatch({ type: SET_CANTIDAD_GENTE, data: datos }),
  };
};

const mapStateToProps = (state) => {
  return {
    usuario: state.user.usuario,
    tipoUsuario: state.user.tipoUsuario,
    sucursal: state.user.sucursal,
    cantidadGente: state.empleado.cantidadGente,
    token: state.user.token,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAdministradorSucursal);
