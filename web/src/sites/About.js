import React from 'react';
import ReactDOM from 'react-dom';
import '../style.css';
import {connect} from 'react-redux'
import {ADMIN} from '../constantes/tiposUsuarios'

class About extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const {tipoUsuario} = this.props
		debugger
		if(tipoUsuario != ADMIN ){
			this.props.history.push("/home")
		}
		return (
			<div className="hero-body">
				<p className="title">{tipoUsuario}</p>
				<p >Si no lees admin, no tendrias que estar aca</p>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
      iniciarSesion: (datos) => dispatch({ type: "INICIAR_SESION", data: datos }),
    };
  };
  
const mapStateToProps = (state) => {
    return {
		tipoUsuario: state.user.tipoUsuario,
    };
  };
  


export default connect(mapStateToProps,mapDispatchToProps)(About)