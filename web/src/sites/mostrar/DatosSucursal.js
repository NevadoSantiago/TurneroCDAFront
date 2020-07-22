import React from 'react';
import { connect } from 'react-redux'

class Home extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		const { sucursal } = this.props
        return(
            <div>
                <p>Aca se muestra la sucursal</p>
            </div>
        )
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		iniciarSesion: (datos) => dispatch({ type: "INICIAR_SESION", data: datos }),
	};
};

const mapStateToProps = (state) => {
	return {
		sucursal: state.user.sucursal,
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(Home)
