import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
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
      provincias: null,
      localidades: null,
      provinciaSelected: null,
      localidadSelected: null,
      textoProvincia: "Seleccione una provincia",
      textoLocalidad: "Seleccione una localidad",
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

  getLocalidades = async (idProvincia) => {
    var url;
    url = URL_API + "/api/locacion/localidades/" + idProvincia

    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (myJson) {
          this.setState({
            localidades: myJson
          })
        }.bind(this)
      );
  }

  componentDidMount() {
    this.getProvincias()
  }

  seleccionarLocalidad = (localidades) => {
    return (
      <Picker
        style={{ margin: 15, height: 50, alignSelf: 'stretch', textAlign: 'center' }}
        mode={Picker.MODE_DROPDOWN}
        selectedValue={(this.state && this.state.pickerLocalidadValue)}
        onValueChange={(value) => {
          if (value !== 0) {
            this.setState({ pickerLocalidadValue: value });
            {
              //this.getLocalidades(parseInt(value))
              console.log(value)
            }
          }
        }}
      >
        <Picker.Item key={'unselectable'} enabled={false} label={this.state.textoLocalidad} value='0' />
        {
          localidades.map((data, i) => (
            <Picker.Item value={data.localidadId} label={data.nombre} key={data.localidadId} />
          ))
        }
      </Picker>
    )
  }

  seleccionarProvincia = (provincias) => {
    return (
      <Picker
        style={{ margin: 15, height: 50, alignSelf: 'stretch', textAlign: 'center' }}
        mode={Picker.MODE_DROPDOWN}
        selectedValue={(this.state && this.state.pickerProvinciaValue)}
        onValueChange={(value) => {
          if (value !== 0) {
            this.getLocalidades(parseInt(value))
            this.setState({ pickerProvinciaValue: value });
          }
        }}
      >
        <Picker.Item key={'unselectable'} enabled={false} label={this.state.textoProvincia} value='0' />
        {
          provincias.map((data, i) => (
            <Picker.Item value={data.provinciaId} label={data.nombre} key={data.provinciaId} />
          ))
        }
      </Picker>
    )
  }

  formularioTurno = (state) => {
    if (this.state.localidades != null) {
      return (
        <React.Fragment>
          {
            this.seleccionarProvincia(this.state.provincias)
          }
          {
            this.seleccionarLocalidad(this.state.localidades)
          }
        </React.Fragment>
      )
    }
    else {
      return (
        this.seleccionarProvincia(this.state.provincias)
      )
    }
  }

  render() {
    const { provincias, localidades, state } = this.state
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
          <View style={styles['center-flex.white']}>
            <Text style={styles['h5']}>
              Cargando...
            </Text>
          </View>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <View style={styles['center-flex.white']}>
            <Text style={styles['h5']}>
              Listado de provincias
            </Text>
            <Text></Text>
            {this.formularioTurno(state)}
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

