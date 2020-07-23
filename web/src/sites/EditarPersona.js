import React from 'react';
import { connect } from 'react-redux'
import Error from '../servicios/alertas/Error'
import Correcto from '../servicios/alertas/Correcto'
import { URL_API_RESERVA } from '../constantes/urlApi'

class EditarPersona extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            correcto: null
        };
    }

    validateData = (nombre, apellido, mail) => {
        if (!nombre) {
            return "Ingrese un nombre";
        }
        else if (!apellido) {
            return "Ingrese un apellido";
        }
        else if (!mail) {
            return "Ingrese un correo electrónico";
        }
    }

    editarDatos = async e => {
        const { location } = this.props
        e.preventDefault();
        const nombre = e.target.elements.nombre.value;
        const apellido = e.target.elements.apellido.value;
        const mail = e.target.elements.mail.value;
        const rol = e.target.elements.rol.value;

        const error = this.validateData(nombre, apellido, mail);
        if (error) {
            this.setState({
                error
            });
            return false;
        } else {
            var url = URL_API_RESERVA + '/api/usuario/editar'
            this.setState({ error: null })
            await fetch(
                url, {
                method: 'POST',
                body: JSON.stringify({
                    idEmpleado: location.user.idEmpleado,
                    nombre: nombre,
                    apellido: apellido,
                    mail: mail,
                    rol: parseInt(rol)
                })
            }
            ).then(response => {
                if (response.status == 200) {
                    const json = response.json()
                        .then(myJson => {
                            debugger
                            console.log(myJson)
                            this.setState({
                                correcto: 'Datos editados correctamente!'
                            })
                        })
                } else {
                    this.setState({ error: "El servidor respondió con error " + response.status.toString() })
                }
            })
        };
    }

    mostrarOpcion = (opcion) => {
        return (
            <option value={opcion.rolId}>{opcion.nombre}</option>
        )
    }

    render() {
        const { error, correcto } = this.state
        const { location, roles } = this.props

        console.log('USER SELECTED')
        console.log(location.user)

        if (location.user != null) {
            return (
                <React.Fragment>
                    <div className="hero-body">
                        <p className="title">{'Editar persona'}</p>
                    </div>
                    <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px', marginBottom: '15px' }}>
                        <form onSubmit={this.editarDatos}>
                            <div className="field">
                                <label className="label">Nombre</label>
                                <div className="control">
                                    <input className="input is-black" type="text" value={location.user.nombre} name="nombre"></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Apellido</label>
                                <div className="control">
                                    <input className="input is-black" type="text" value={location.user.apellido} name="nombre"></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Correo electrónico</label>
                                <div className="control">
                                    <input className="input is-black" type="text" value={location.user.mail} name="mail"></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Rol</label>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <div className="select is-fullwidth is-black">
                                                <select name="rol">
                                                    {
                                                        /*roles.map((e, i) =>
                                                            this.mostrarOpcion(e)
                                                        )*/
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
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
        sucursal: state.user.sucursal,
        roles: state.empleado.roles
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditarPersona)
