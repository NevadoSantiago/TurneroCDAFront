import React from "react";
import { connect } from "react-redux";

export const HeaderTablaListaEspera = () => {
  return (
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Especialidad</th>
        <th>DNI</th>
      </tr>
    </thead>
  );
};

class TablaListaEspera extends React.Component {
  render() {
    const { persona } = this.props;
    return (
      <tbody>
        <tr>
          <td>
            <b>{`${persona.nombre === null ? "-" : persona.nombre}`}</b>
          </td>
          <td>
            <b>{`${persona.apellido === null ? "-" : persona.apellido}`}</b>
          </td>
          <td>
            <b>{`${
              persona.especialidad === null ? "-" : persona.especialidad
            }`}</b>
          </td>
          <td>
            <b>{`${
              persona.nroDocumento === null ? "-" : persona.nroDocumento
            }`}</b>
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

export default connect(mapStateToProps, mapDispatchToProps)(TablaListaEspera);
