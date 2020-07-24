import React from 'react';
import { eliminarEmpleadoServ } from '../../../servicios/AdminServices'
import { ELIMINAR_EMPLEADO } from '../../../constantes/actionRedux'
import { CONTROL_ES } from '../../../constantes/tiposUsuarios'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import { getEmpleadoBySucursalYRol } from '../../../servicios/AdminServices'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const HeaderES = () => {
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


class DatosES extends React.Component {
    eliminarEmpleado = () =>{
        const {eliminarEmpleado, empleado } = this.props
        if(window.confirm("Seguro que desea eliminar a " + empleado.nombre + "?")){
            eliminarEmpleado(empleado.idEmpleado)
           {this.props.refresh()}
        }
    }
    render() {
        const {empleado} = this.props
        return (
            <tbody>
                <tr>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.apellido}</td>
                    <td>{empleado.rol}</td>
                    <td>{empleado.mail}</td>
                    <td style={{ display: 'inline-table', marginBottom: '5px' }}>
                        <button 
                            className="button is-danger"
                            onClick={() => this.eliminarEmpleado()}
                            style={{ margin: '5px' }}
                        >
                            Eliminar
                        </button>
                        <NavLink to={{ pathname: '/editar', user: empleado }} className="button is-info" exact={true} activeClassName='button is-warning' style={{ margin: '5px' }}>
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
        controlES: state.empleado.controlES,
        sucursal: state.user.sucursal,
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(DatosES)