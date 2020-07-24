import React from 'react';
import { eliminarEmpleadoServ } from '../../../servicios/AdminServices'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux'
import { ELIMINAR_EMPLEADO } from '../../../constantes/actionRedux'

export const HeaderRecepcionistas = () => {
    return (
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Rol</th>
                <th>Mail</th>
                <th></th>
            </tr>
        </thead>
    )

}
class DatosRecepcionistas extends React.Component {

    eliminarEmpleado = () => {
        const { eliminarEmpleado, empleado } = this.props
        if (window.confirm("Seguro que desea eliminar a " + empleado.nombre + ' ' + empleado.apellido + "?")) {
            eliminarEmpleado(empleado.idEmpleado)
            { this.props.refresh() }
        }
    }

    render() {
        const { empleado } = this.props
        return (
            <tbody>
                <tr>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.apellido}</td>
                    <td>{empleado.rol}</td>
                    <td>{empleado.mail}</td>
                    <td className="right aligned" style={{ padding: 0 }}>
                        <button
                            className="button is-danger is-outlined"
                            onClick={() => this.eliminarEmpleado(empleado.idEmpleado)}
                            style={{ margin: '5px' }}
                        >
                            <span className="icon">
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span>Eliminar</span>
                        </button>
                        <NavLink to={{ pathname: '/editar', user: empleado }} className="button is-primary is-outlined" exact={true} activeClassName='button is-warning' style={{ margin: '5px' }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faEdit} />
                            </span>
                            <span>Editar</span>
                        </NavLink>
                    </td>
                </tr>
            </tbody>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        eliminarEmpleado: (id) => dispatch({ type: ELIMINAR_EMPLEADO, data: id }),
    };
};

const mapStateToProps = (state) => {
    return {
        sucursal: state.user.sucursal,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatosRecepcionistas)