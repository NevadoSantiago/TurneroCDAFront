import React from "react";
import "../style.css";
import { connect } from "react-redux";
import { getAllSucursales } from "../servicios/AdminServices";

class AdministrarSucursales extends React.Component {
  constructor() {
    super();
    this.state = {
      sucursales: null,
    };
  }
  obtenerSucursales = async () => {
    const { token } = this.props;
    const sucursales = await getAllSucursales(token);
    this.setState({
      sucursales,
    });
  };
  componentDidMount() {
    this.obtenerSucursales();
  }

  render() {
    const { tipoUsuario } = this.props;
    const { sucursales } = this.state;
    return (
      <div className="hero-body">
        <p className="title">{tipoUsuario}</p>
        <p>Si no lees admin_gen, no tendrias que estar acaa</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tipoUsuario: state.user.tipoUsuario,
    token: state.user.token,
  };
};

export default connect(mapStateToProps, null)(AdministrarSucursales);
