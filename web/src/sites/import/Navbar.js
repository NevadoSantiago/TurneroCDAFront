import React from 'react';
import { NavLink } from "react-router-dom";
import '../../style.css';
import { connect } from 'react-redux'
import { faUser, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { SET_CONTROL_ES, SET_RECEPCIONISTAS, CERRAR_SESION } from "../../constantes/actionRedux"
import { ADMIN_SUCURSAL, EMPLEADO, CONTROL_ES, RECEPCION } from '../../constantes/tiposUsuarios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {navBarResponse} from '../../constantes/textsScripts'
import NavBarAdminSuc from './navBar/admin_suc'
import NavRecepcion from './navBar/recepcion'
import NavControlES from './navBar/controlES'
import NavNoAuth from './navBar/noAuth'

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
        const script = document.createElement('script');

        script.type = 'text/javascript'
        script.async = true
        script.innerHTML =navBarResponse

        document.body.appendChild(script);
    }

    cerrarSesion = () => {
        const { cerrarSesion } = this.props
        cerrarSesion()
    }
/*     getEmpleadosSucRol = async (idSucursal, rol) => {
        const { setControlES, setRecepcionistas, recepcionistas, controlES } = this.props
        switch (rol) {
            case CONTROL_ES: {
                if (controlES == null) {
                    const empleados = await getEmpleadoBySucursalYRol(idSucursal, rol)
                    setControlES(empleados)
                }
                break;
            }
            case RECEPCION: {
                if (recepcionistas == null) {
                    
                    const empleados = await getEmpleadoBySucursalYRol(idSucursal, rol)
                    setRecepcionistas(empleados)
                }

                break;
            }
            default: {
                console.log("ERROR")
                break;
            }
        }
    } */

    render() {
        const { usuario, tipoUsuario, sucursal } = this.props

        if (tipoUsuario != null) {
            switch (tipoUsuario) {
                case ADMIN_SUCURSAL: {
                    return (
                        <NavBarAdminSuc/>
                    )
                }
                case CONTROL_ES: {
                    return (
                        <NavControlES/>
                    )
                }
                case RECEPCION: {
                    return (
                        <NavRecepcion/>
                    )
                }
            }
        } else {
            return (
                <NavNoAuth/>
            )
        }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setControlES: (datos) => dispatch({ type: SET_CONTROL_ES, data: datos }),
        setRecepcionistas: (datos) => dispatch({ type: SET_RECEPCIONISTAS, data: datos }),
        cerrarSesion: () => dispatch({ type: CERRAR_SESION })
    };
};

const mapStateToProps = (state) => {
    return {
        usuario: state.user.usuario,
        sucursal: state.user.sucursal,
        tipoUsuario: state.user.tipoUsuario,
        recepcionistas: state.empleado.recepcionistas,
        controlES: state.empleado.controlES,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
