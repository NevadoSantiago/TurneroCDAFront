import React from 'react';
import {eliminarEmpleadoServ} from '../../../servicios/AdminServices'

export const HeaderRecepcionistas = () => {
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
export const DatosRecepcionistas = ({empleado}) => {
    return(
        <tbody>
            <tr>
            <td>{empleado.nombre}</td>
            <td>{empleado.apellido}</td>
            <td>{empleado.rol}</td>
            <td>{empleado.mail}</td>
            <td>
                <button className="button is-danger" 
                onClick={()=>eliminarEmpleadoServ(empleado.idEmpleado)}>Eliminar</button>
                <button className="button is-warning">Editar</button>
            </td>
            </tr>
        </tbody>
    )

}