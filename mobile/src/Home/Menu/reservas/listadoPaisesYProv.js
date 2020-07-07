import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { withTheme, Button } from "react-native-elements";
import styles from '../../../../App.scss';
import MostrarEspecialidades from '../Mostrar/mostrarEspecialidades';
import { ScrollView } from "react-native-gesture-handler";
import { SET_ESPECIALIDAD, SET_COORDENADAS, FILTRAR_CANTIDAD,FILTRAR_DISTANCIA } from '../constantes/actionRedux';

class ListadoPaisesYProv extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Ubicacion aproximada',
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
/*     if (especialidades == null) {
      return (
        <View>
          <Text>
            No hay ubicaciones
          </Text>
        </View>)
    } else { */
      return (
        <React.Fragment>
          <View>
              <Text>
                  Aca se van a mostrar los paises y provincias
              </Text>
          </View>
        </React.Fragment>
      )
    /* } */
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
    especialidades: state.turnos.listaEspecialidades,
    idEspecialidad: state.turnos.idEspecialidad,
    especialidadNotSelected: state.turnos.especialidadNotSelected
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(ListadoPaisesYProv));

