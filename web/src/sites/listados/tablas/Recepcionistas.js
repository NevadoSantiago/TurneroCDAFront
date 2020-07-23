import React from 'react';
import { eliminarEmpleadoServ } from '../../../servicios/AdminServices'

export const HeaderRecepcionistas = () => {
    return (
        <thead>
            <tr>
                <th style={{ padding: '12px' }}>Nombre</th>
                <th style={{ padding: '12px' }}>Apellido</th>
                <th style={{ padding: '12px' }}>Rol</th>
                <th style={{ padding: '12px' }}>Mail</th>
                <th></th>
            </tr>
        </thead>
    )

}
export const DatosRecepcionistas = ({ empleado }) => {
    return (
        <tbody>
            <tr>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.rol}</td>
                <td>{empleado.mail}</td>
                <td style={{ display: 'inline-table', margin: '-5px' }}>
                    <button
                        className="button is-danger"
                        onClick={() => eliminarEmpleadoServ(empleado.idEmpleado)}
                        style={{ margin: '5px' }}
                    >
                        Eliminar
                        </button>
                    <button
                        className="button is-warning"
                        style={{ margin: '5px' }}
                    >
                        Editar
                        </button>
                </td>
            </tr>
        </tbody>
    )

}