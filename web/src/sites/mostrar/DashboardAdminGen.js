import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { SET_ESPECIALIDADES } from "../../constantes/actionRedux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class DashboardAdminGen extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="hero-body">
          <p className="title">Dashboard Admin General</p>
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
            <NavLink
              to="/empleado/nuevo"
              className="button is-black is-rounded is-outlined"
              exact={true}
              activeClassName="button is-black is-rounded is-outlined"
              style={{ margin: 5 }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span>Nuevo empleado</span>
            </NavLink>
            <NavLink
              to="/sucursal/nuevo"
              className="button is-black is-rounded is-outlined"
              exact={true}
              activeClassName="button is-black is-rounded is-outlined"
              style={{ margin: 5 }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span>Nueva sucursal</span>
            </NavLink>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEspecialidades: (datos) =>
      dispatch({ type: SET_ESPECIALIDADES, data: datos }),
  };
};

const mapStateToProps = (state) => {
  return {
    usuario: state.user.usuario,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAdminGen);
