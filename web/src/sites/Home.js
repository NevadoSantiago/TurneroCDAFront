import React from 'react';
import { connect } from 'react-redux'
import { ADMIN, EMPLEADO } from '../constantes/tiposUsuarios'
import DatosSucursal from '../sites/mostrar/DatosSucursal'

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
							<p className="title">Sos un empleado</p>
							<p className="subtitle">Datos de tu sucursal</p>
						</div>
					</React.Fragment>
				);
			case ADMIN:
				return (
					<React.Fragment>
						<div className="contenedorSucursal">
							<DatosSucursal/>
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



export default connect(mapStateToProps, mapDispatchToProps)(Home)
