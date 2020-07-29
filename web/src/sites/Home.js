import React from "react";
import { connect } from "react-redux";
import {
  ADMIN_SUCURSAL,
  ADMIN_GENERAL,
  CONTROL_ES,
  RECEPCION,
} from "../constantes/tiposUsuarios";
import DashboardAdministradorSucursal from "../sites/mostrar/DashboardAdministradorSucursal";
import DashboardEmpleado from "./mostrar/DashboardEmpleado";
import DashboardAdminGeneral from "./mostrar/DashBoardAdminGen";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { tipoUsuario } = this.props;

    switch (tipoUsuario) {
      case CONTROL_ES:
        return <DashboardEmpleado />;
      case RECEPCION:
        return <DashboardEmpleado />;
      case ADMIN_SUCURSAL:
        return (
          // ESTE ES LO MISMO QUE DashboardEmpleado
          <DashboardAdministradorSucursal />
        );
      case ADMIN_GENERAL:
        return <DashboardAdminGeneral />;
      default:
        break;
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
    tipoUsuario: state.user.tipoUsuario,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
