import React from 'react';
import { connect } from 'react-redux'
import Error from '../servicios/alertas/Error'
import { HeaderTablaListaEspera } from './listados/tablas/ListaEspera'
import TablaListaEspera from './listados/tablas/ListaEspera'
import { getListaDeEspera } from '../servicios/EmpleadoServices'

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
        const listaDeEspera = await getListaDeEspera(sucursal.sucursalId)
        this.setState({
            listaDeEspera: listaDeEspera
        })
    }

    componentDidMount() {
        this.getListaDeEspera()
        this.interval = setInterval(() => this.getListaDeEspera(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { listaDeEspera, error } = this.state
        const { location } = this.props

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
