import React from 'react';
import { connect } from 'react-redux'
import Error from '../servicios/alertas/Error'
import { URL_API_RESERVA, URL_API_ESPECIALIDAD } from '../constantes/urlApi'

class NuevoTurno extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null
        };
    }

    validateData = (nombre, dni, sintomas) => {
        if (!nombre) {
            return "Ingrese un nombre";
        }
        else if (!dni) {
            return "Ingrese un número de documento";
        }
        else if (!sintomas) {
            return "Ingrese los síntomas";
        }
    }

    especialidades = async e => {
        const url = URL_API_ESPECIALIDAD + '/api/usuario/auth'
    }

    nuevoTurno = async e => {
        const { idUsuario, sucursal } = this.props
        e.preventDefault();
        const nombre = e.target.elements.nombre.value;
        const sintomas = e.target.elements.sintomas.value;
        const dni = e.target.elements.dni.value
        const idEspecialidad = e.target.elements.especialidad.value;

        const error = this.validateData(nombre, dni, sintomas);
        if (error) {
            this.setState({
                error
            });
            return false;
        } else {
            var url = URL_API_RESERVA + '/api/reserva/crear/' + idUsuario
            console.log(url)
            console.log(nombre)
            console.log(dni)
            console.log(sintomas)
            console.log(sucursal.sucursalId)
            console.log(idEspecialidad)
            console.log(sucursal.configuracion.cordLatitud)
            console.log(sucursal.configuracion.cordLongitud)
            this.setState({ error: null })
            /*await fetch(
                url, {
                method: 'POST',
                body: JSON.stringify({
                    descSintomas: sintomas,
                    sucursalId: sucursal.sucursalId,
                    especialidadId: idEspecialidad,
                    latitud: sucursal.configuracion.cordLatitud,
                    longitud: sucursal.configuracion.cordLongitud,
                })
            }
            ).then(response => {
                if (response.status == 200) {
                    const json = response.json()
                        .then(myJson => {
                            debugger
                            console.log(myJson)
                        })
                } else {
                    this.setState({ error: "Datos incorrectos" })
                }
            })*/
        };
    }

    render() {
        const { error } = this.state
        return (
            <React.Fragment>
                <div className="hero-body">
                    <p className="title">{'Nuevo turno'}</p>
                </div>
                <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px', marginBottom: '15px' }}>
                    <form onSubmit={this.nuevoTurno}>
                        <div className="field">
                            <label className="label">Nombre y apellido</label>
                            <div className="control">
                                <input className="input is-black" type="text" placeholder="" name="nombre"></input>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Número de documento</label>
                            <div className="control">
                                <input className="input is-black" type="text" placeholder="" name="dni"></input>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Síntomas</label>
                            <div className="control">
                                <input className="input is-black" type="text" placeholder="" name="sintomas"></input>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Especialidad</label>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className="select is-fullwidth is-black">
                                            <select name="especialidad">
                                                <option value="1">Opción 1</option>
                                                <option value="2">Opción 2</option>
                                                <option value="3">Opción 3</option>
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
                    </form>
                </div>
            </React.Fragment>
        )
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
        sucursal: state.user.sucursal
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevoTurno)
