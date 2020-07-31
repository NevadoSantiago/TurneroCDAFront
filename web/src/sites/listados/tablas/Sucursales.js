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
        <th>Dirección</th>
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

  eliminarSucursal = (sucursal) => {
    //const { eliminarSucursal } = this.props;
    if (
      window.confirm(
        "Seguro que desea eliminar a la sucursal " + sucursal.nombre + "?"
      )
    ) {
      //  eliminarEmpleado(sucursal.sucursalId)

      this.props.refresh();
    }
  };

  render() {
    const { sucursal } = this.props;
    var iconoHabilitado;
    if (sucursal.habilitada) {
      iconoHabilitado = faCheck;
    } else {
      iconoHabilitado = faTimes;
    }
    return (
      <tbody>
        <tr>
          <td style={{ padding: "1rem" }}>{sucursal.nombre}</td>
          <td style={{ padding: "1rem" }}>{sucursal.direccion}</td>
          <td style={{ padding: "1rem" }}>
            {sucursal.configuracion.fechaApertura}
          </td>
          <td style={{ textAlign: "center", padding: "15px" }}>
            {" "}
            <span className="icon" style={{}}>
              <FontAwesomeIcon icon={iconoHabilitado} />
            </span>
          </td>
          <td className="right aligned" style={{ padding: "7px 10px 0px 0px" }}>
            <button
              className="button is-danger is-outlined"
              onClick={() => this.eliminarSucursal(sucursal)}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span>Eliminar</span>
            </button>
            <NavLink
              to={{ pathname: "/editarSucursal", suc: sucursal }}
              className="button is-primary is-outlined"
              exact={true}
              activeClassName="button is-warning"
              style={{ marginLeft: "10px" }}
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
