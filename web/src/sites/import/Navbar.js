import React from "react";
import "../../style.css";
import { connect } from "react-redux";
import {
  ADMIN_SUCURSAL,
  CONTROL_ES,
  RECEPCION,
  ADMIN_GENERAL,
} from "../../constantes/tiposUsuarios";
import NavBarAdminSuc from "./navBar/admin_suc";
import NavRecepcion from "./navBar/recepcion";
import NavControlES from "./navBar/controlES";
import NavNoAuth from "./navBar/noAuth";
import NavAdminGeneral from "./navBar/admin_gen";
import NavDefault from "./navBar/navDefault";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { tipoUsuario } = this.props;
    if (tipoUsuario != null) {
      switch (tipoUsuario) {
        case ADMIN_SUCURSAL: {
          return <NavBarAdminSuc />;
        }
        case ADMIN_GENERAL: {
          return <NavAdminGeneral />;
        }
        case CONTROL_ES: {
          return <NavControlES />;
        }
        case RECEPCION: {
          return <NavRecepcion />;
        }
        default: {
          return <NavDefault />;
        }
      }
    } else {
      return <NavNoAuth />;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    tipoUsuario: state.user.tipoUsuario,
  };
};

export default connect(mapStateToProps, null)(Navbar);
