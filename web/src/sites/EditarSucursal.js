import React from 'react';
import { connect } from 'react-redux'
import Error from '../servicios/alertas/Error'
import Correcto from '../servicios/alertas/Correcto'
import { getAdminstradoresDeSucursal } from '../servicios/EmpleadoServices'
import { editarDatos } from '../servicios/AdminServices'
import Administradores from '../sites/listados/Administradores'

class EditarSucursal extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            correcto: null,
            admins: null
        };
    }
    mostrarOpcion = (opcion) => {
        return (
            <option value={opcion.tipoId}>{opcion.detalle}</option>
        )
    }
    editarDatos = async e => {
        const { location } = this.props
        const seEdito = await editarDatos(e, location)
        if (seEdito) {
            this.setState({
                correcto: "Se edito el usuario correctamente"
            })
            setTimeout(() => { this.props.history.goBack() }, 1500)
        } else {
            this.setState({
                error: "Hubo un error al editar"
            })
        }
    }

    render() {
        const { error, correcto } = this.state
        const { location } = this.props

        const sucursal = location.suc


        if (sucursal != null) {
            return (
                <React.Fragment>
                    <div className="hero-body">
                        <p className="title">{'Editar Sucursal'}</p>
                    </div>
                    <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px', marginBottom: '15px' }}>
                         <form  onSubmit={this.editarDatos} >
                            <div className="field">
                                <label className="label">Nombre</label>
                                <div className="control">
                                    <input className="input is-black" type="text" placeholder={sucursal.nombre} name="nombre"></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Direccion</label>
                                <div className="control">
                                    <input className="input is-black" type="text" placeholder={sucursal.direccion} name="apellido"></input>
                                </div>
                            </div>                          
                            
                            <div className="field is-grouped is-grouped-centered">
                                <div className="control">
                                    <button className="button is-primary" type="submit">Confirmar</button>
                                </div>
                            </div>
                            {error && <Error message={error} />}
                            {correcto && <Correcto message={correcto} />}
                        </form>
                        <Administradores sucursal={sucursal}/>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <div className="hero-body">
                    <div className="container" style={{ textAlign: 'center' }}>
                        <p className="subtitle">Cargando...</p>
                    </div>
                </div>
            )
        }

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const mapStateToProps = (state) => {
    return {
        usuario: state.user.usuario,
        tipoUsuario: state.user.tipoUsuario,
        roles: state.empleado.roles
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditarSucursal)
