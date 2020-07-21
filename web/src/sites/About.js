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
				<p className="title">{tipoUsuario}</p>
				<p >Si no lees admin, no tendrias que estar aca</p>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		usuario: state.user.usuario,
	};
};

export default connect(mapStateToProps, null)(About)