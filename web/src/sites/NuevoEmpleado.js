import React from "react";
import { connect } from "react-redux";

class NuevoEmpleado extends React.Component {
  constructor() {
    super();
    this.state = {
      sucursales: null,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="hero-body">
          <div className="columns is-mobile">
            <div className="column">
              <p className="title">Nuevo empleado</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevoEmpleado);
