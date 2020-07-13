import React, { Component } from "react";
import { View, Text, Picker, TouchableOpacity, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { withTheme, Button } from "react-native-elements";
import styles from '../../../../App.scss';
import MostrarEspecialidades from '../Mostrar/mostrarEspecialidades';
import { ScrollView } from "react-native-gesture-handler";
import { SET_ESPECIALIDAD, SET_COORDENADAS, FILTRAR_CANTIDAD, FILTRAR_DISTANCIA } from '../constantes/actionRedux';
import { URL_API } from '../constantes/urlApi'
//import Autocomplete from 'react-native-autocomplete-input'
import { Ionicons } from "@expo/vector-icons";
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import { Container } from "native-base";

var writing = false

class ListadoPaisesYProv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provincias: null,
      localidades: null,
      provinciaSelected: null,
      localidadSelected: null,
      textoProvincia: "Ingrese una provincia",
      textoLocalidad: "Ingrese una localidad"
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
    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    return (
      <SafeAreaView>
        <Autocomplete
          key={2}
          style={{ maxHeight: 40 }}
          placeholder='Ingrese una localidad'
          //scrollToInput={ev => scrollToInput(ev)}
          initialValue={(this.state && this.state.pickerLocalidadValue)}
          handleSelectItem={(item, id) => {
            //const { onDropdownClose } = this.props;
            //onDropdownClose();
            console.log(item);
            this.setState({ pickerLocalidadValue: item.nombre, localidadSelected: item });
            writing == false
          }}
          //onDropdownClose={() => onDropdownClose()}
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
    /*return (
      <Picker
        style={{ marginHorizontal: 15, height: 50, alignSelf: 'stretch', textAlign: 'center' }}
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
    )*/
  }

  seleccionarProvincia = (provincias) => {
    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    return (
      <SafeAreaView>
        <Autocomplete
          onChangeText={
            writing = true,
            console.warn(writing)
          }
          key={1}
          style={{ maxHeight: 40 }}
          placeholder='Ingrese una provincia'
          //scrollToInput={ev => scrollToInput(ev)}
          initialValue={(this.state && this.state.pickerProvinciaValue)}
          handleSelectItem={(item, id) => {
            const { onDropdownClose } = this.props;
            //onDropdownClose();
            this.getLocalidades(item.provinciaId)
            this.setState({ pickerProvinciaValue: item.nombre, provinciaSelected: item });
            writing = false
            console.warn(writing)
          }}
          renderIcon={() => (
            <Ionicons name="ios-add-circle-outline" size={20} color="#c7c6c1" style={{ position: "absolute", left: 28, top: 11, }} />
          )}
          //onDropdownClose={() => onDropdownClose()}
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

    /*return (
      <Picker
        style={{ marginHorizontal: 15, height: 50, alignSelf: 'stretch', textAlign: 'center' }}
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
    )*/
  }

  formularioTurno = (state) => {
    var { localidades, provincias, localidadSelected } = state
    if (localidades != null && writing == false) {
      console.log('LOCALIDAD SELECCIONADA')
      console.log(localidadSelected)
      console.log('----------------------------')
      return (
        <React.Fragment>
          {
            this.seleccionarProvincia(provincias)
          }
          {
            this.seleccionarLocalidad(localidades)
          }
        </React.Fragment>
      )
    }
    else {
      return (
        this.seleccionarProvincia(provincias)
      )
      /*
      return (
        <View style={{ height: 70, marginHorizontal: 15, padding: 10, backgroundColor: styles.primary.color, borderRadius: 15, zIndex: 0 }}>
          <View style={{ height: 50, paddingVertical: 5, paddingHorizontal: 5, backgroundColor: 'white', borderRadius: 10, zIndex: 0 }}>
            <View style={{ flex: 1, zIndex: 999 }}>
              {this.seleccionarProvincia(this.state.provincias)}
            </View>
          </View>
        </View>
      )
      */
    }
  }

  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    console.log(item);
    this.getLocalidades(item.provinciaId)
    this.setState({ pickerProvinciaValue: item.provinciaId });
  }

  render() {
    const { provincias, localidades } = this.state
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
          <View style={styles['flex.white']}>
            <Text style={styles['text.center']}>
              Ubicación inicial
            </Text>
            <Text></Text>
            {this.formularioTurno(this.state)}
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

