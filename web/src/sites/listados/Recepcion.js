import React from 'react';
import { connect } from 'react-redux'
import { HeaderRecepcionistas, DatosRecepcionistas } from './tablas/Recepcionistas'

class Recepcion extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const { recepcionistas } = this.props
		if (recepcionistas != null) {
			if (recepcionistas.length === 0) {
				return (
					<div className="hero-body">
						<p className="title">Recepción</p>
						<div className="container" style={{ textAlign: 'center' }}>
							<p className="subtitle">No hay datos</p>
						</div>
					</div>
				)
			} else {
				return (
					<div className="hero-body">
						<p className="title">Recepción</p>
						<table className="ui red table">
							<HeaderRecepcionistas />
							{
								recepcionistas.map((e, i) => (
									<DatosRecepcionistas empleado={e} />
								))
							}
						</table>
					</div>
				)
			}
		} else {
			return (
				<p>Cargando..</p>
			)
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
		recepcionistas: state.empleado.recepcionistas,
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(Recepcion)