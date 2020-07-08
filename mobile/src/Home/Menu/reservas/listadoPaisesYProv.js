import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { withTheme, Button } from "react-native-elements";
import styles from '../../../../App.scss';
import MostrarEspecialidades from '../Mostrar/mostrarEspecialidades';
import { ScrollView } from "react-native-gesture-handler";
import { SET_ESPECIALIDAD, SET_COORDENADAS, FILTRAR_CANTIDAD, FILTRAR_DISTANCIA } from '../constantes/actionRedux';
import { URL_API } from '../constantes/urlApi'

class ListadoPaisesYProv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provincias: null
    }
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

  getProvincias = async () => {
    var url;
    url = URL_API + "/api/locacion/provincias"

    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (myJson) {
          this.setState({
            provincias: myJson
          })
        }.bind(this)
      );
  }

  componentDidMount() {
    this.getProvincias()
  }

  render() {
    const { provincias } = this.state
    /*     if (especialidades == null) {
          return (
            <View>
              <Text>
                No hay ubicaciones
              </Text>
            </View>)
        } else { */

    if (provincias == null) {
      return (
        <React.Fragment>
          <View style={ styles['center-flex.white'] }>
            <Text style={ styles['h5'] }>
              Cargando...
            </Text>
          </View>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <View style={ styles['center-flex.white'] }>
            <Text style={ styles['h5'] }>
              Listado de provincias
            </Text>
            <Text></Text>
            {
              provincias.map((p) => {
                return (
                  <Text style={ styles['text'] }>{p.nombre}</Text>
                )
              })
            }
          </View>
        </React.Fragment>
      )
    }
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

