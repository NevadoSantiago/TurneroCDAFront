import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from "react-redux";
import { ListItem, withTheme, Icon } from "react-native-elements";
import styles from '../../../../App.scss'
import TouchableScale from "react-native-touchable-scale";
import { SET_ESPECIALIDAD } from '../constantes/actionRedux'
import { Button } from 'native-base';

class MostrarEspecialidades extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
    }
  }

  render() {
    const { especialidad, setEspecialidad, theme, idEspecialidad } = this.props
    var color, textColor

    if (especialidad.especialidadId === idEspecialidad) {
      color = styles.success.color
      textColor = styles.white.color
    } else {
      color = styles.gray.color
      textColor = styles.dark.color
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
          color: textColor,
          textAlign: "center",
          fontFamily: "Nunito_bold",
          fontSize: 17,
        }}
        //chevron={{ color: textColor, size: 20 }}
        rightElement={(
          <Icon
            name='more-vert'
            color={textColor}
            onPress={() => console.warn('bip bup 🤖')}
          />
        )}
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