import React from 'react';
import { connect } from 'react-redux'
import { ADMIN_SUCURSAL, EMPLEADO, CONTROL_ES, RECEPCION } from '../constantes/tiposUsuarios'
import DatosSucursal from '../sites/mostrar/DatosSucursal'
import DashboardEmpleado from './mostrar/DashboardEmpleado'

class Home extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const { tipoUsuario } = this.props

		switch (tipoUsuario) {
			case CONTROL_ES:
				return (
					<DashboardEmpleado />
				);
			case RECEPCION:
				return (
					<DashboardEmpleado />
				);
			case ADMIN_SUCURSAL:
				return (
					<React.Fragment>
						<div className="hero-body">
							<DatosSucursal />
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
		tipoUsuario: state.user.tipoUsuario
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(Home)
