import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from "react-redux";
import { ListItem, withTheme } from "react-native-elements";
import styles from '../../../../App.scss'
import TouchableScale from "react-native-touchable-scale";
import { SET_ESPECIALIDAD } from '../constantes/actionRedux'

class MostrarEspecialidades extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
    }
  }

  render() {
    const { especialidad, setEspecialidad, theme, idEspecialidad } = this.props
    var color

    if (especialidad.especialidadId === idEspecialidad) {
      color = styles.success.color
    } else {
      color = styles.primary.color
    }

    return (
      <ListItem
        Component={TouchableScale}
        containerStyle={{
          marginLeft: 10,
          marginRight: 10,
          margin: 5,
          borderRadius: 15,
        }}
        friction={90}
        tension={100}
        activeScale={0.95}
        linearGradientProps={{
          colors: [color, color],
          start: { x: 1, y: 3 },
          end: { x: 0.1, y: 5 },
        }}
        title={especialidad.nombre}
        key={especialidad.especialidadId}
        titleStyle={{
          color: styles.white.color,
          textAlign: "center",
          fontFamily: "Nunito_bold",
          fontSize: 17,
        }}
        chevron={{ color: styles.white.color, size: 20 }}
        onPress={(e) => {
          setEspecialidad(especialidad.especialidadId)
        }}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEspecialidad: (datos) => dispatch({ type: SET_ESPECIALIDAD, data: datos }),
  };
};

const mapStateToProps = (state) => {
  return {
    colores: state.turnos.botonesEspecialidades,
    idEspecialidad: state.turnos.idEspecialidad
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(MostrarEspecialidades));