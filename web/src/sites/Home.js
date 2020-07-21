import React from 'react';
import { connect } from 'react-redux'

class Home extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const { usuario, history } = this.props
		return (
			<React.Fragment>
				<div className="hero-body">
					<p className="title">{usuario}</p>
					<p >Si no lees admin o empleado, no tendrias que estar aca</p>
				</div>
			</React.Fragment>

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
		usuario: state.user.usuario,
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(Home)
