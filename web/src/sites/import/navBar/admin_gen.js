import React from 'react';
import { NavLink } from "react-router-dom";
import '../../../style.css';
import { connect } from 'react-redux'
import { SET_CONTROL_ES, SET_RECEPCIONISTAS, CERRAR_SESION } from "../../../constantes/actionRedux"
import {navBarResponse} from '../../../constantes/textsScripts'

class NavAdminGeneral extends React.Component {
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

    render() {
        const { usuario, tipoUsuario, sucursal } = this.props

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

export default connect(mapStateToProps, mapDispatchToProps)(NavAdminGeneral)
