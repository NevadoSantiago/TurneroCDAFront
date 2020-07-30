import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
//import { ELIMINAR_ADMINISTRADOR } from "../../../constantes/actionRedux";
import { eliminarAdminDeSucursal } from "../../../servicios/AdminServices";

export const HeaderAdministradores = () => {
  return (
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Mail</th>
        <th></th>
      </tr>
    </thead>
  );
};
class DatosAdministradores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  eliminarAdministrador = async (admin) => {
    //const { eliminarAdmin } = this.props;
    if (
      window.confirm(
        "Seguro que desea eliminar el administrador " +
          admin.nombre +
          " " +
          admin.apellido +
          "?"
      )
    ) {
      await eliminarAdminDeSucursal(admin.idEmpleado);
      this.props.refresh();
    }
  };

  render() {
    const { admin } = this.props;
    return (
      <tbody>
        <tr>
          <td style={{ padding: "1rem" }}>{admin.nombre}</td>
          <td style={{ padding: "1rem" }}>{admin.apellido}</td>
          <td style={{ padding: "1rem" }}>{admin.mail}</td>
          <td className="right aligned" style={{ padding: "7px 10px 0px 0px" }}>
            <button
              className="button is-danger is-outlined"
              onClick={() => this.eliminarAdministrador(admin)}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span>Eliminar</span>
            </button>
          </td>
        </tr>
      </tbody>
    );
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
)(DatosAdministradores);
