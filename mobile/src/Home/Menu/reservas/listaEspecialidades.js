import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { withTheme } from "react-native-elements";
import MostrarEspecialidades from '../Mostrar/mostrarEspecialidades'
import styles from '../../../../App.scss'
import { ScrollView } from "react-native-gesture-handler";
import { SET_ESPECIALIDAD, SET_COORDENADAS } from '../constantes/actionRedux';

class ListaEspecialidades extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Especialidades',
    headerStyle: {
      backgroundColor: styles.white.color,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: styles.primary.color,
    headerTitleStyle: {
      fontWeight: 'normal',
      fontFamily: 'Nunito',
      color: styles.primary.color
    },
  };

  render() {
    const { especialidades, navigation } = this.props
    if (especialidades == null) {
      return (
        <View>
          <Text>
            No hay especialidades
          </Text>
        </View>)
    } else {
      return (
        <React.Fragment>
          <ScrollView style={{ backgroundColor: styles.white.color }}>
            {
              this.props.especialidades.map((e, i) => {
                return (
                  <MostrarEspecialidades especialidad={e} nav={navigation} />
                )
              }
              )
            }
          </ScrollView>
        </React.Fragment>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEspecialidad: (datos) => dispatch({ type: SET_ESPECIALIDAD, data: datos }),
    setCoordenadas: (datos, tipoBusqueda) => dispatch({ type: SET_COORDENADAS, busqueda: tipoBusqueda, data: datos })
  };
};

const mapStateToProps = (state) => {
  return {
    especialidades: state.turnos.listaEspecialidades,
    idEspecialidad: state.turnos.idEspecialidad,
    especialidadNotSelected: state.turnos.especialidadNotSelected
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(ListaEspecialidades));