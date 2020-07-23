import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserPlus, faQrcode, faChartPie } from "@fortawesome/free-solid-svg-icons";
import NuevoTurno from '../NuevoTurno';

class DashboardEmpleado extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const { usuario, sucursal } = this.props

        return (
            <React.Fragment>
                <div className="hero-body">
                    <p className="title">{'Hola ' + usuario}</p>
                </div>
                <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px', marginBottom: '15px' }}>
                    <div className="columns">
                        <div className="column" style={{ alignSelf: 'center' }}>
                            <div>
                                <p className="title">{sucursal.nombre}</p>
                                <p className="subtitle">{sucursal.direccion}</p>
                            </div>
                        </div>
                        <div className="column" style={{ display: 'flex', margin: '-10px' }}>
                            <div style={{ backgroundColor: 'whitesmoke', textAlign: 'end', borderTopLeftRadius: '500px', borderBottomLeftRadius: '500px', width: '50%', padding: '10px' }}>
                                <p className="subtitle">{'En espera'}</p>
                                <p className="title">{'7'}</p>
                            </div>
                            <div style={{ backgroundColor: 'whitesmoke', textAlign: 'start', borderTopRightRadius: '500px', borderBottomRightRadius: '500px', width: '50%', padding: '10px', borderLeft: 'dashed', borderColor: '#CCCCCC' }}>
                                <p className="subtitle">{'Atendidos'}</p>
                                <p className="title">{'1'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px', marginBottom: '15px', textAlign: 'center' }}>
                    <div style={{ margin: -5 }}>
                        <button class="button is-rounded is-black is-outlined" style={{ margin: 5 }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faQrcode} />
                            </span>
                            <span>Escanear código QR</span>
                        </button>
                        <NavLink to="/nuevo" className="button is-rounded is-outlined" exact={true} activeClassName='button is-rounded is-outlined' style={{ margin: 5 }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faUserPlus} />
                            </span>
                            <span>Nuevo turno</span>
                        </NavLink>
                        <button class="button is-rounded is-outlined" style={{ margin: 5 }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </span>
                            <span>Lista de espera</span>
                        </button>
                        <button class="button is-rounded is-outlined" style={{ margin: 5 }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faChartPie} />
                            </span>
                            <span>Ver estadísticas</span>
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEmpleado)