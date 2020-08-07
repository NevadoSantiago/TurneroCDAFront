import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { ELIMINAR_EMPLEADO } from "../../../constantes/actionRedux";

export const HeaderNoRegistrados = () => {
  return (
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Sucursal</th>
        <th>Rol</th>
        <th>Código</th>
        <th></th>
      </tr>
    </thead>
  );
};
class DatosNoRegistrados extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  eliminarEmpleado = (empleado) => {
    const { eliminarEmpleado, token } = this.props;
    if (
      window.confirm(
        "Seguro que desea eliminar a " +
          empleado.nombre +
          " " +
          empleado.apellido +
          "?"
      )
    ) {
      eliminarEmpleado(empleado.idEmpleado, token);
      this.props.refresh();
    }
  };

  render() {
    const { persona } = this.props;
    return (
      <tbody key={persona.idEmpleado}>
        <tr>
          <td style={{ padding: "1rem" }}>{persona.nombre}</td>
          <td style={{ padding: "1rem" }}>{persona.apellido}</td>
          <td style={{ padding: "1rem" }}>{persona.nombreSucursal}</td>
          <td style={{ padding: "1rem" }}>{persona.rol}</td>
          <td style={{ padding: "1rem" }}>
            <b>{persona.codigo}</b>
          </td>
          <td className="right aligned" style={{ display: "flex" }}>
            <button
              className="button is-danger is-outlined"
              onClick={() => this.eliminarEmpleado(persona)}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span>Eliminar</span>
            </button>
            <NavLink
              to={{ pathname: "/editar", user: persona }}
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
    eliminarEmpleado: (id, token) =>
      dispatch({ type: ELIMINAR_EMPLEADO, data: id, token: token }),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatosNoRegistrados);
