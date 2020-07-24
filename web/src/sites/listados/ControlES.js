import React from 'react';
import { connect } from 'react-redux'
import { HeaderES } from './tablas/ControlES'
import DatosES from './tablas/ControlES'
import { CONTROL_ES } from '../../constantes/tiposUsuarios'
import { SET_CONTROL_ES } from '../../constantes/actionRedux'
import { getEmpleadoBySucursalYRol } from '../../servicios/AdminServices'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class ControlES extends React.Component {
	constructor() {
		super();
		this.state = {
			recargar: false,
			controlES: null,
		};
	}
	getEmpleados = async (idSucursal, rol) => {
		this.setState({
			recargar: true
		})
		var controlES = await getEmpleadoBySucursalYRol(idSucursal, rol)
		this.setState({
			controlES,
			recargar: false
		})
	}
	componentDidMount() {
		const { sucursal } = this.props
		this.getEmpleados(sucursal.sucursalId, CONTROL_ES)
	}
	render() {
		const { sucursal } = this.props
		const { recargar, controlES } = this.state
		debugger
		if (controlES != null && !recargar) {
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
						<table className="ui sortable red table">
							<HeaderES />
							{
								controlES.map((e, i) => {
									return (
										<DatosES empleado={e} refresh={() =>
											this.getEmpleados(sucursal.sucursalId, CONTROL_ES)
										} />
									)
								}
								)
							}
							<tfoot className="full-width">
								<tr>
									<th colspan="5" style={{ textAlign: 'center' }}>
										<div className="ui pagination menu">
											<a className="icon item">
												<FontAwesomeIcon icon={faAngleLeft}/>
											</a>
											<a className="item" style={{ fontFamily: 'Nunito' }}>1</a>
											<a className="icon item">
												<FontAwesomeIcon icon={faAngleRight}/>
											</a>
										</div>
									</th>
								</tr>
							</tfoot>
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
		sucursal: state.user.sucursal
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(ControlES)