import React from 'react';
import { connect } from 'react-redux'

class Home extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const { usuario } = this.props
		if (usuario != null) {
			return (
				<div className="hero-body">
					<p className="title">{'Hola ' + usuario}</p>
				</div>
			);
		} else {
			return (
				<div className="hero-body">
					<p className="title">Home</p>
				</div>
			);
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)