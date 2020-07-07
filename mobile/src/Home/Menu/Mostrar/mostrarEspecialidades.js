import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from "react-redux";
import { ListItem, withTheme, Icon, Overlay, ButtonGroup } from "react-native-elements";
import styles from '../../../../App.scss'
import TouchableScale from "react-native-touchable-scale";
import { SET_ESPECIALIDAD, SET_COORDENADAS } from '../constantes/actionRedux'

class MostrarEspecialidades extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      isVisible: false,
      selectedIndex: null
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    console.warn(selectedIndex)
    switch (selectedIndex) {
      case 0: // DISTANCIA
        this.encontrarCoordenadas()
        this.setState({
          isVisible: false
        })
        break;
      case 1: // NOMBRE
        /*this.setState({
          isVisible: false
        })*/
        break;
      case 2: // CANTIDAD DE PERSONAS
        /*this.setState({
          isVisible: false
        })*/
        break;
      default:
        break;
    }
    this.setState({ selectedIndex })
  }

  encontrarCoordenadas = () => {
    const { setCoordenadas } = this.props
    navigator.geolocation.getCurrentPosition(
      posicion => {
        setCoordenadas(JSON.stringify(posicion))
        console.log(JSON.stringify(posicion.coords))
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    const { especialidad, setEspecialidad, theme, idEspecialidad } = this.props
    const { selectedIndex } = this.state
    var color, textColor

    if (especialidad.especialidadId === idEspecialidad) {
      color = styles.success.color
      textColor = styles.white.color
    } else {
      color = styles.gray.color
      textColor = styles.dark.color
    }

    return (
      <React.Fragment>
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          overlayStyle={{ padding: -100, width: '75%' }}
        >
          <Text style={{ alignSelf: 'center', padding: 15, fontFamily: 'Nunito_bold' }}>Opciones de búsqueda</Text>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={['Distancia (requiere permisos)', 'Nombre', 'Cantidad de personas']}
            containerStyle={{ height: 120, width: '100%', alignSelf: 'center', marginBottom: 0, marginTop: 0, borderWidth: 0, borderRadius: 0, borderBottomEndRadius: 3, borderBottomStartRadius: 3, borderTopWidth: 2, borderTopColor: styles.dark.color }}
            textStyle={{ fontFamily: 'Nunito' }}
            vertical={true}
          />
        </Overlay>
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
              onPress={() => {
                console.warn('bip bup 🤖')
                this.setState({
                  isVisible: true
                })
              }}
            />
          )}
          onPress={(e) => {
            setEspecialidad(especialidad.especialidadId)
          }}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEspecialidad: (datos) => dispatch({ type: SET_ESPECIALIDAD, data: datos }),
    setCoordenadas: (datos) => dispatch({ type: SET_COORDENADAS, data: datos })
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