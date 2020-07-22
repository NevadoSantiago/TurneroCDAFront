import React from 'react';
import { connect } from 'react-redux'
import {HeaderES} from './tablas/ControlES'
import DatosES from './tablas/ControlES'
import {SET_CONTROL_ES} from '../../constantes/actionRedux'

class ControlES extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}


	render() {
		const {controlES} = this.props
		if(controlES != null){
			console.log(controlES)
			return(
				<table class="table" style={{width:"100%"}}>
					<HeaderES/>
					{
						controlES.map((e,i)=>{
							return(
									<DatosES empleado={e}/>						
							)
						}							
											
					)
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
		setControlES: (datos) => dispatch({ type: SET_CONTROL_ES, data:datos }),
	};
};

const mapStateToProps = (state) => {
	return {
		controlES: state.empleado.controlES,
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(ControlES)