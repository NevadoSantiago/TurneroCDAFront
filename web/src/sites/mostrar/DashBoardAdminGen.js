import React from 'react';
import { connect } from 'react-redux'
import { SET_ESPECIALIDADES } from '../../constantes/actionRedux'

class DashboardEmpleado extends React.Component {
    constructor(props) {
        super();
        this.state = {
        }
    }


    render() {
        const {} = this.props
        const {  } = this.state
        return (
            <p>Dashboard Admin General</p>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEspecialidades: (datos) => dispatch({ type: SET_ESPECIALIDADES, data: datos }),
    };
};

const mapStateToProps = (state) => {
    return {
        usuario: state.user.usuario,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEmpleado)