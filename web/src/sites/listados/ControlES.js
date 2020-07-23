import React from 'react';
import { connect } from 'react-redux'
import { HeaderES } from './tablas/ControlES'
import DatosES from './tablas/ControlES'
import { SET_CONTROL_ES } from '../../constantes/actionRedux'

class ControlES extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}
	render() {
		const { controlES } = this.props
		if (controlES != null) {
			console.log(controlES)
			if (controlES.length === 0) {
				return (
					<div className="hero-body">
						<p className="title">Control E/S</p>
						<div className="container" style={{ textAlign: 'center' }}>
							<p className="subtitle">No hay datos</p>
						</div>
					</div>
				)
			} else {
				return (
					<div className="hero-body">
						<p className="title">Control E/S</p>
						<table className="table is-hoverable" style={{ width: "100%", borderRadius: '20px' }}>
							<HeaderES />
							{
								controlES.map((e, i) => {
									return (
										<DatosES empleado={e} />
									)
								}
								)
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
		setControlES: (datos) => dispatch({ type: SET_CONTROL_ES, data: datos }),
	};
};

const mapStateToProps = (state) => {
	return {
		controlES: state.empleado.controlES,
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(ControlES)