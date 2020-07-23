import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserPlus, faQrcode, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { getEspecialidadesPorSucursal, getCantGenteEnSucursal } from '../../servicios/EmpleadoServices'
import { SET_ESPECIALIDADES, SET_CANTIDAD_GENTE } from '../../constantes/actionRedux'

class DashboardEmpleado extends React.Component {
    constructor(props) {
        super();
        this.state = {
            highlightEnEspera: false
        }
    }
    getEspecialidades = async (idSucursal) => {
        const { setEspecialidades } = this.props
        const especialidades = await getEspecialidadesPorSucursal(idSucursal)
        setEspecialidades(especialidades)
    }
    getCantidadDeGenteEnEspera = async () => {
        const { sucursal, setCantidadDeGente, cantidadGente } = this.props
        const cant = await getCantGenteEnSucursal(sucursal.sucursalId)
        if (cant != cantidadGente) {
            console.log('cambio')
            this.setState({
                highlightEnEspera: true
            })
            setInterval(() => this.setState({
                highlightEnEspera: false
            }), 2000)
        }
        setCantidadDeGente(cant)
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now(), highlightEnEspera: true }), 10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { usuario, sucursal, cantidadGente } = this.props
        const { highlightEnEspera } = this.state
        this.getCantidadDeGenteEnEspera()
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
                            <div
                                className={`${highlightEnEspera ? "highlighted" : "highlight-whitesmoke"}`}
                                style={{
                                    //backgroundColor: 'whitesmoke', 
                                    textAlign: 'end',
                                    borderTopLeftRadius: '500px',
                                    borderBottomLeftRadius: '500px',
                                    width: '50%',
                                    padding: '10px',
                                    MozTransition: 'all 0.5s ease-out',
                                    OTransition: 'all 0.5s ease-out',
                                    WebkitTransition: 'all 0.5s ease-out',
                                    transition: 'all 0.5s ease-out'
                                }}>
                                <p className="subtitle">{'En espera'}</p>
                                <p className="title">{cantidadGente}</p>
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
                        <NavLink to="/nuevo" onClick={() => this.getEspecialidades(sucursal.sucursalId)} className="button is-rounded is-outlined" exact={true} activeClassName='button is-rounded is-outlined' style={{ margin: 5 }}>
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
        setEspecialidades: (datos) => dispatch({ type: SET_ESPECIALIDADES, data: datos }),
        setCantidadDeGente: (datos) => dispatch({ type: SET_CANTIDAD_GENTE, data: datos }),
    };
};

const mapStateToProps = (state) => {
    return {
        usuario: state.user.usuario,
        tipoUsuario: state.user.tipoUsuario,
        sucursal: state.user.sucursal,
        cantidadGente: state.empleado.cantidadGente
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEmpleado)