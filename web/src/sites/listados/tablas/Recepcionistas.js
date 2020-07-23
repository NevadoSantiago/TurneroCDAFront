import React from 'react';
import { eliminarEmpleadoServ } from '../../../servicios/AdminServices'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

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
                    <NavLink to={{ pathname: '/editar', user: empleado }} className="button is-warning" exact={true} activeClassName='button is-warning' style={{ margin: '5px' }}>
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