import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faEdit,
  faTrash,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { ELIMINAR_EMPLEADO } from "../../../constantes/actionRedux";

export const HeaderSucursales = () => {
  return (
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Direccion</th>
        <th>Apertura</th>
        <th>Habilitada</th>
        <th></th>
      </tr>
    </thead>
  );
};
class DatosSucursales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  eliminarEmpleado = () => {
    const { eliminarEmpleado, empleado } = this.props;
    if (
      window.confirm(
        "Seguro que desea eliminar a " +
          empleado.nombre +
          " " +
          empleado.apellido +
          "?"
      )
    ) {
      eliminarEmpleado(empleado.idEmpleado);
      this.props.refresh();
    }
  };

  render() {
    const { sucursal } = this.props;
    var iconoHabilitado;
    if (sucursal.habilitada) {
      console.log("HABILITADA");
      iconoHabilitado = faCheck;
    } else {
      console.log("DESHABILITADA");
      iconoHabilitado = faTimes;
    }
    return (
      <tbody>
        <tr>
          <td>{sucursal.nombre}</td>
          <td>{sucursal.direccion}</td>
          <td>{sucursal.configuracion.fechaApertura}</td>
          <td className="center aligned">
            <span className="icon">
              <FontAwesomeIcon icon={iconoHabilitado} />
            </span>
          </td>
          <td className="right aligned" style={{ padding: 0 }}>
            <button
              className="button is-danger is-outlined"
              onClick={() => this.eliminarEmpleado(sucursal.sucursalId)}
              style={{ margin: "5px" }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span>Eliminar</span>
            </button>
            <NavLink
              to={{ pathname: "/editar", user: sucursal }}
              className="button is-primary is-outlined"
              exact={true}
              activeClassName="button is-warning"
              style={{ margin: "5px" }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span>Editar</span>
            </NavLink>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    eliminarEmpleado: (id) => dispatch({ type: ELIMINAR_EMPLEADO, data: id }),
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DatosSucursales);
