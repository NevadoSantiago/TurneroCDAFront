import React from 'react';
import '../style.css';
import { connect } from 'react-redux'

class About extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const { usuario } = this.props
		return (
			<div className="hero-body">
				<p className="title">{usuario}</p>
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
		usuario: state.user.usuario,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(About)