import React from 'react';
import { connect } from 'react-redux'
import { ADMIN, EMPLEADO } from '../constantes/tiposUsuarios'
import { GOOGLE_MAPS_API_KEY } from '../constantes/keys'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

class Home extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const { usuario, history, tipoUsuario } = this.props

		switch (tipoUsuario) {
			case EMPLEADO:
				return (
					<React.Fragment>
						<div className="hero-body">
							<p className="title">{'Hola ' + usuario}</p>
						</div>
						<div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px', marginBottom: '15px' }}>
							<div className="columns">
								<div className="column" style={{}}>
									<p className="title">{'Sucursal'}</p>
									<p className="subtitle">{'Dirección'}</p>
								</div>
								<div className="column" style={{ }}>
									<Map
										google={this.props.google}
										zoom={10}
										initialCenter={{
											lat: -34.6144934119689,
											lng: -58.4458563545429
										}}
										containerStyle={{ position: 'relative' }}
										style={{ height: '100%' }}
										>
											<Marker name={'Current location'} />
									</Map>
								</div>
							</div>
						</div>
					</React.Fragment >
				);
			case ADMIN:
				return (
					<React.Fragment>
						<div className="hero-body">
							<p className="title">Sos un administrador</p>
							<p className="subtitle">Sucursales</p>
						</div>
					</React.Fragment>
				);
			default:
				break;
		}
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
		tipoUsuario: state.user.tipoUsuario
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({ apiKey: (GOOGLE_MAPS_API_KEY) })(Home))
