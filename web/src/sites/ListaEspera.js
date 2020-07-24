import React from 'react';
import { connect } from 'react-redux'
import { URL_API } from '../constantes/urlApi'
import Error from '../servicios/alertas/Error'
import { HeaderTablaListaEspera } from './listados/tablas/ListaEspera'
import TablaListaEspera from './listados/tablas/ListaEspera'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class ListaEspera extends React.Component {
    constructor() {
        super();
        this.state = {
            listaDeEspera: null,
            error: null
        };
    }

    getListaDeEspera = async () => {
        const { location } = this.props
        const { sucursal } = location

        const url = URL_API + '/api/sucursal/get/listadoEspera/' + sucursal.sucursalId
        await fetch(
            url, {
            method: "GET"
        }
        ).then(response => {
            if (response.status == 200) {
                const json = response.json()
                    .then(myJson => {
                        this.setState({
                            listaDeEspera: myJson
                        })
                    })
            } else {
                this.setState({ error: "El servidor no pudo responder a la solicitud" })
            }
        })
            .catch(err => {
                this.setState({ error: 'No se pudo conectar con el servidor' })
            })
    }

    componentDidMount() {
        this.getListaDeEspera()
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { listaDeEspera, error } = this.state
        const { location } = this.props

        this.getListaDeEspera()

        if (location.sucursal != null && listaDeEspera != null) {
            const { sucursal } = location
            if (error) {
                return (
                    <React.Fragment>
                        <div className="hero-body">
                            <p className="title">{'Lista de espera'}</p>
                            <p className="subtitle">
                                {sucursal.nombre + ' - ' + sucursal.direccion}
                                &nbsp;
                                <b>{'(' + sucursal.sucursalId + ')'}</b>
                            </p>
                        </div>
                        <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px' }}>
                            <Error message={error} />
                        </div>
                    </React.Fragment>
                )
            }
            else {
                return (
                    <React.Fragment>
                        <div className="hero-body">
                            <p className="title">{'Lista de espera'}</p>
                            <p className="subtitle">
                                {sucursal.nombre + ' - ' + sucursal.direccion}
                                &nbsp;
                                <b>{'(' + sucursal.sucursalId + ')'}</b>
                            </p>
                        </div>
                        <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px' }}>
                            <table className="ui sortable green table">
                                <HeaderTablaListaEspera />
                                {
                                    listaDeEspera.map((p, i) => {
                                        return (
                                            <TablaListaEspera persona={p} refresh={() =>
                                                this.getListaDeEspera()
                                            } />
                                        )
                                    }
                                    )
                                }
                            </table>
                        </div>
                    </React.Fragment>
                )
            }
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListaEspera)
