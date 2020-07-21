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
		const { tipoUsuario } = this.props
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
		tipoUsuario: state.user.tipoUsuario,
	};
};

export default connect(mapStateToProps, null)(About)