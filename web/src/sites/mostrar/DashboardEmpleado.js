import React from 'react';
import { connect } from 'react-redux'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { GOOGLE_MAPS_API_KEY } from '../../constantes/keys'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { faReact, faJava } from '@fortawesome/free-brands-svg-icons'

class DashboardEmpleado extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const { usuario, sucursal } = this.props

        console.log(sucursal)

        return (
            <React.Fragment>
                <div className="hero-body">
                    <p className="title">{'Hola ' + usuario}</p>
                </div>
                <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px', marginBottom: '15px' }}>
                    <div className="columns">
                        <div className="column">
                            <div style={{ marginBottom: '10px' }}>
                                <p className="title">{sucursal.nombre}</p>
                                <p className="subtitle">{sucursal.direccion}</p>
                            </div>
                            <div style={{ margin: -5 }}>
                                <button class="button is-rounded is-success is-outlined" style={{ margin: 5 }}>
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    <span>User</span>
                                </button>
                                <button class="button is-rounded is-warning is-outlined" style={{ margin: 5 }}>
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faReact} />
                                    </span>
                                    <span>React</span>
                                </button>
                                <button class="button is-rounded is-danger is-outlined" style={{ margin: 5 }}>
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                    <span>Times</span>
                                </button>
                                <button class="button is-rounded is-primary is-outlined" style={{ margin: 5 }}>
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faJava} />
                                    </span>
                                    <span>Java</span>
                                </button>
                            </div>
                        </div>
                        <div className="column" style={{}}>
                            <Map
                                google={this.props.google}
                                zoom={17}
                                initialCenter={{
                                    lat: parseFloat(sucursal.configuracion.cordLatitud),
                                    lng: parseFloat(sucursal.configuracion.cordLongitud)
                                }}
                                containerStyle={{ position: 'relative', height: 320 }}
                                style={{ height: '100%' }}
                            >
                                <Marker name={sucursal.nombre} />
                            </Map>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        iniciarSesion: (datos) => dispatch({ type: "INICIAR_SESION", data: datos }),
    };
};

const mapStateToProps = (state) => {
    return {
        usuario: state.user.usuario,
        tipoUsuario: state.user.tipoUsuario,
        sucursal: state.user.sucursal
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({ apiKey: (GOOGLE_MAPS_API_KEY) })(DashboardEmpleado))