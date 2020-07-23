import React from 'react';
import {eliminarEmpleado} from '../../../servicios/AdminServices'
import {SET_CONTROL_ES} from '../../../constantes/actionRedux'
import {CONTROL_ES} from '../../../constantes/tiposUsuarios'
import {connect} from 'react-redux'
import {getEmpleadoBySucursalYRol} from '../../../servicios/AdminServices'

export const HeaderES = () => {
    return(
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
    actualizarEmpleadosES = async (idEmpleado) => {
        const {setControlES, sucursal} = this.props
        eliminarEmpleado(idEmpleado)
        var empleados = await getEmpleadoBySucursalYRol(sucursal.sucursalId, CONTROL_ES)
        setControlES(empleados);
    }
    render(){
    const {empleado} = this.props
           return(
        <tbody>
            <tr>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.rol}</td>
                <td>{empleado.mail}</td>
                <td>
                <button className="button is-danger" 
                onClick={()=>this.actualizarEmpleadosES(empleado.idEmpleado)}>Eliminar</button>
                <button className="button is-warning">Editar</button>
                </td>
            </tr>
        </tbody>
    )
    }
}
const mapDispatchToProps = (dispatch) => {
	return {
		setControlES: (datos) => dispatch({ type: SET_CONTROL_ES, data:datos }),
	};
};

const mapStateToProps = (state) => {
	return {
        controlES: state.empleado.controlES,
        sucursal : state.user.sucursal,
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(DatosES)