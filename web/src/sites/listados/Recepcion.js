import React from 'react';
import { connect } from 'react-redux'
import {HeaderRecepcionistas,DatosRecepcionistas} from './tablas/Recepcionistas'

class Recepcion extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const {recepcionistas} = this.props
		if(recepcionistas != null){
			return(
				<table class="table" style={{width:"100%"}}>
					<HeaderRecepcionistas/>
					{
						recepcionistas.map((e,i)=>(							
						<DatosRecepcionistas empleado={e}/>						
						))
					}
				</table>
				)
		}else{
			return(
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