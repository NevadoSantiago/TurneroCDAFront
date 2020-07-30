import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class AuthRoutePrivate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      tipoUsuario,
      path,
      component: Component,
      autorizado,
      autorizado2,
      autorizado3,
      autorizado4,
      ...props
    } = this.props;
    return (
      <Route
        {...props}
        render={(props) => {
          if (tipoUsuario == null) {
            return <Redirect to="/login" />;
          } else {
            if (
              tipoUsuario === autorizado ||
              tipoUsuario === autorizado2 ||
              tipoUsuario === autorizado3 ||
              tipoUsuario === autorizado4
            ) {
              return <Component {...props} />;
            } else {
              return <Redirect to="/noAutorizado" />;
            }
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tipoUsuario: state.user.tipoUsuario,
    estaLogueado: state.user.estaLogueado,
  };
};

export default connect(mapStateToProps, null)(AuthRoutePrivate);
