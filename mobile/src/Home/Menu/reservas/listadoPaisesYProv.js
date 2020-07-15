import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { withTheme, Button } from "react-native-elements";
import styles from '../../../../App.scss';
import { SET_ESPECIALIDAD, SET_COORDENADAS, FILTRAR_CANTIDAD, FILTRAR_DISTANCIA } from '../constantes/actionRedux';
import { URL_API } from '../constantes/urlApi'
import { Ionicons } from "@expo/vector-icons";
import { Autocomplete } from "react-native-dropdown-autocomplete";

var writingProvincia = false
var writingLocalidad = false

class ListadoPaisesYProv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provincias: null,
      localidades: null,
      provinciaSelected: null,
      localidadSelected: null,
      textoProvincia: "Ingrese una provincia",
      textoLocalidad: "Ingrese una localidad",
      finishWriting: false
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
    const { onDropdownShow } = this.props;
    const { textoLocalidad } = this.state

    return (
      <SafeAreaView>
        <Autocomplete
          key={2}
          style={{ maxHeight: 40 }}
          placeholder={textoLocalidad}
          onChangeText={ () => {
            writingLocalidad = true
          }}
          initialValue={(this.state && this.state.pickerLocalidadValue)}
          handleSelectItem={(item, id) => {
            this.setState({ pickerLocalidadValue: item.nombre, localidadSelected: item, finishWriting: true });
            writingLocalidad == false
          }}
          onDropdownShow={() => onDropdownShow()}
          inputStyle={{ borderColor: styles.primary.color, fontFamily: 'Nunito' }}
          separatorStyle={{ backgroundColor: 'black' }}
          listFooterStyle={{ backgroundColor: 'red' }}
          listHeaderStyle={{ backgroundColor: 'red' }}
          pickerStyle={{ borderColor: styles.primary.color }}
          scrollStyle={{ borderColor: styles.primary.color }}
          inputContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: styles.primary.color,
            paddingHorizontal: 15,
            justifyContent: "flex-start",
          }}
          data={localidades}
          minimumCharactersCount={1}
          highlightText
          noDataText="No hay resultados"
          spinnerColor={styles.primary.color}
          highLightColor={styles.primary.color}
          valueExtractor={item => item.nombre}
          rightTextExtractor={item => item.properties}
        />
      </SafeAreaView>
    )
  }

  seleccionarProvincia = (provincias, finished) => {
    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;
    const { textoProvincia } = this.state

    if (finished) {
      writingLocalidad == false
    }

    return (
      <SafeAreaView>
        <Autocomplete
          onChangeText={() => {
            writingProvincia = true
            writingLocalidad = finished
            this.setState({ finishWriting: false })
          }}
          key={1}
          style={{ maxHeight: 40 }}
          placeholder={textoProvincia}
          initialValue={(this.state && this.state.pickerProvinciaValue)}
          handleSelectItem={(item, id) => {
            const { onDropdownClose } = this.props;
            this.getLocalidades(item.provinciaId)
            this.setState({ pickerProvinciaValue: item.nombre, provinciaSelected: item });
            writingProvincia = false
            writingLocalidad = true
          }}
          renderIcon={() => (
            <Ionicons name="ios-add-circle-outline" size={20} color="#c7c6c1" style={{ position: "absolute", left: 28, top: 11, }} />
          )}
          onDropdownShow={() => onDropdownShow()}
          inputStyle={{ borderColor: styles.primary.color, fontFamily: 'Nunito' }}
          separatorStyle={{ backgroundColor: 'black' }}
          listFooterStyle={{ backgroundColor: 'red' }}
          listHeaderStyle={{ backgroundColor: 'red' }}
          pickerStyle={{ borderColor: styles.primary.color }}
          scrollStyle={{ borderColor: styles.primary.color }}
          inputContainerStyle={{
            display: "flex",
            flexShrink: 0,
            flexGrow: 0,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            borderColor: styles.primary.color,
            paddingHorizontal: 15,
            justifyContent: "flex-start",
          }}
          data={provincias}
          minimumCharactersCount={1}
          highlightText
          noDataText="No hay resultados"
          spinnerColor={styles.primary.color}
          highLightColor={styles.primary.color}
          valueExtractor={item => item.nombre}
          rightTextExtractor={item => item.properties}
        />
      </SafeAreaView>
    )
  }

  formularioTurno = (state) => {
    var { localidades, provincias, localidadSelected, finishWriting } = state

    if (finishWriting == false) {
      if (localidades != null && writingProvincia == false && writingLocalidad == true) {
        return (
          <React.Fragment>
            {
              this.seleccionarProvincia(provincias, false)
            }
            {
              this.seleccionarLocalidad(localidades)
            }
          </React.Fragment>
        )
      }
      else {
        return (
          this.seleccionarProvincia(provincias, false)
        )
      }
    } else {
      return (
        <React.Fragment>
          {
            this.seleccionarProvincia(provincias, true)
          }
          {
            this.seleccionarLocalidad(localidades)
          }
        </React.Fragment>
      )
    }
  }

  showSelectedData = () => {
    const { provinciaSelected, localidadSelected, finishWriting } = this.state
    if (finishWriting == true) {
      if (provinciaSelected != null && localidadSelected != null) {
        return (
          <View>
            <Text style={styles['text.center']}>
              {provinciaSelected.nombre + '\n'}
              {localidadSelected.nombre}
            </Text>
            <Button 
              containerStyle={{ marginHorizontal: 15 }}
              buttonStyle={{ backgroundColor: styles.secondary.color, borderRadius: 15, height: 50 }}
              titleStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Nunito_bold',
                width: '100%'
              }}
              title="Confirmar ubicación"
              onPress={() => {
                console.log('----- UBICACIÓN CONFIRMADA -----')
                console.log(localidadSelected)
                console.log('--------------------------------')
              }}
            ></Button>
          </View>
        )
      }
      else if (provinciaSelected != null && localidadSelected == null) {
        return (
          <Text style={styles['text.center']}>
            {provinciaSelected.nombre}
          </Text>
        )
      }
    }
  }

  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    this.getLocalidades(item.provinciaId)
    this.setState({ pickerProvinciaValue: item.provinciaId });
  }

  render() {
    const { provincias, localidades, provinciaSelected, localidadSelected } = this.state

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
          <View style={styles['flex.white']}>
            {this.formularioTurno(this.state)}
            {this.showSelectedData()}
          </View>
        </React.Fragment>
      )
    }
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