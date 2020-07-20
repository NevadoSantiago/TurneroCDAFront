import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { MAP_STYLE } from "../constantes/mapStyle";
import { connect } from "react-redux";
import TouchableScale from "react-native-touchable-scale";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { withTheme, ListItem, Icon, Slider } from "react-native-elements";
import { Input, Button, ButtonGroup, Overlay } from "react-native-elements";
import { CALCULAR_DISTANCIA, SET_SUCURSAL, GUARDAR_RESERVA } from '../constantes/actionRedux'
import MapView from "react-native-maps";
import styles from '../../../../App.scss'
import { getDistance } from 'geolib';
import { Autocomplete } from "react-native-dropdown-autocomplete";
import { URL_API_RESERVA } from '../constantes/urlApi'

const imageWidth = Dimensions.get("window").width;

class ListaSucursales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucursalesFiltradas: this.props.sucursales,
      idEspecialidad: this.props.idEspecialidad,
      idUsuario: this.props.idUsuario,
      isVisible: false,
      isOverlayTurnoVisible: false,
      selectedIndex: null,
      distancia: 3,
      seCalculoDistancia: false,
      selectedReservaIndex: null,
      sucursalSelected: '',
      textoSucursal: 'Buscar una sucursal',
      wasSelected: false,
      sintomas: " "
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  static navigationOptions = {
    title: 'Seleccione una sucursal',
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

  updateIndex(selectedIndex) {

    switch (selectedIndex) {
      case 0: // DISTANCIA 
        this.setState({
          isVisible: false
        })
        break;
      case 1: // Personas en cola
        this.setState({
          isVisible: false
        })
        break;
      case 2: //NOMBRE
        this.setState({
          isVisible: false
        })
        break;
      default:
        break;
    }
    this.setState({ selectedIndex })
  }

  filtrarSucursalesDistancia(value) {
    this.props.sucursales.forEach(element => {
      if (getDistance(
        { latitude: element.configuracion.cordLatitud, longitude: element.configuracion.cordLongitud },
        { latitude: this.props.ubicacion.coords.latitude, longitude: this.props.ubicacion.coords.longitude }
      ) <= value * 1000) {
      }
    });
  }
  realizarReserva = async () => {
    const { sintomas, sucursalSelected } = this.state
    const { idEspecialidad, idUsuario, guardarReserva, navigation } = this.props
    var url = URL_API_RESERVA + '/api/reserva/crear/' + idUsuario
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        descSintomas: sintomas,
        sucursalId: sucursalSelected.sucursalId,
        especialidadId: idEspecialidad,
      })
    }
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        guardarReserva(myJson)
        navigation.navigate('Reservas')
      }
      )
  }

  render() {
    const { theme, updateTheme, replaceTheme, ubicacion, sucursales, calcularDistancia, setSucursal } = this.props;
    const { selectedIndex, seCalculoDistancia, sucursalSelected, sucursalesFiltradas, wasSelected } = this.state

    const { distancia } = this.state
    var latitude, longitude

    latitude = ubicacion.coords.latitude
    longitude = ubicacion.coords.longitude

    if (sucursalesFiltradas != null) {
      if (sucursalSelected != '' && wasSelected) {
        var result = []
        result.push(sucursalSelected)
        this.setState({
          sucursalesFiltradas: result,
          distancia: sucursalSelected.distanciaAPersona + 1,
          wasSelected: false
        })
      }
      if (!seCalculoDistancia) {
        calcularDistancia(ubicacion, sucursalesFiltradas)
        this.setState({
          seCalculoDistancia: true
        })
      }
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Overlay
            isVisible={this.state.isOverlayTurnoVisible}
            onBackdropPress={() => this.setState({ isOverlayTurnoVisible: false })}
            overlayStyle={{ padding: -100, width: '75%' }}
          >
            <React.Fragment>
              <Text style={{ alignSelf: 'flex-start', padding: 15, fontFamily: 'Nunito_bold', fontSize: 18 }}>
                Reservar turno
            </Text>
              <Input
                placeholder='Síntomas (opcional)'
                containerStyle={{ alignSelf: 'center', width: '96%' }}
                onChangeText={(text) => this.setState({ sintomas: text })}
              />
              <Text style={{ alignSelf: 'flex-start', paddingBottom: 15, paddingHorizontal: 15, fontFamily: 'Nunito' }}>
                Desea reservar un turno en {this.state.sucursalSelected.nombre} ahora?
            </Text>
              <View style={{ alignItems: 'flex-end', flexDirection: 'row-reverse', paddingHorizontal: 5, paddingBottom: 10 }}>
                <Button
                  containerStyle={{ width: 60 }}
                  title="NO"
                  type="clear"
                  onPress={() => { this.setState({ isOverlayTurnoVisible: false }) }}

                />
                <Button
                  containerStyle={{ width: 60, marginHorizontal: 15 }}
                  title="SI"
                  type="clear"
                  onPress={() => {
                    this.setState({ isOverlayTurnoVisible: false }),
                    this.realizarReserva()
                  }}
                />
              </View>
            </React.Fragment>
          </Overlay>
          <View style={styles['flex-white']}>
            <Autocomplete
              onChangeText={() => {
                this.setState({ writingSucursal: false, sucursalSelected: '', sucursalesFiltradas: sucursales, wasSelected: true })
              }}
              key={1}
              style={{ maxHeight: 40 }}
              placeholder={this.state.textoSucursal}
              initialValue={(this.state && this.state.sucursalSelected)}
              handleSelectItem={(item, id) => {
                const { onDropdownClose } = this.props;
                this.setState({ sucursalSelected: item });
              }}
              /*renderIcon={() => (
                <Ionicons name="ios-add-circle-outline" size={20} color="#c7c6c1" style={{ position: "absolute", left: 28, top: 11, }} />
              )}*/
              onDropdownShow={() => onDropdownShow()}
              inputStyle={{ borderWidth: 0, fontFamily: 'Nunito' }}
              separatorStyle={{ backgroundColor: 'black' }}
              listFooterStyle={{ backgroundColor: 'white' }}
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
                justifyContent: "flex-start",
              }}
              data={sucursalesFiltradas}
              minimumCharactersCount={1}
              highlightText
              noDataText="No hay resultados"
              spinnerColor={styles.primary.color}
              highLightColor={styles.primary.color}
              valueExtractor={item => item.nombre}
              rightTextExtractor={item => item.properties}
            />
            <MapView
              style={mapStyles.mapStyle}
              showsUserLocation={false}
              customMapStyle={
                MAP_STYLE
              }
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                longitudeDelta: 0,
                latitudeDelta: 0.2,
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 112, 255, 0.3)',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      borderWidth: 3,
                      borderColor: 'white',
                      borderRadius: 9,
                      overflow: 'hidden',
                      backgroundColor: '#007AFF'
                    }}
                  >
                  </View>
                </View>
              </MapView.Marker>
              {
                sucursalesFiltradas.map((s, i) => {
                  return (
                    <MapView.Marker
                      coordinate={{
                        latitude: Number.parseFloat(s.configuracion.cordLatitud),
                        longitude: Number.parseFloat(s.configuracion.cordLongitud),
                      }}
                      title={s.nombre}
                      description={s.direccion}
                    ></MapView.Marker>
                  )
                }
                )
              }
            </MapView>
          </View>
          <View style={styles['flex.light']}>
            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
              <Text style={{ fontFamily: 'Nunito_bold' }}>{'Distancia máxima: ' + distancia.toFixed(1)} km</Text>
              <Slider
                value={this.state.distancia}

                onValueChange={(value) => this.setState({
                  distancia: value
                })}
                minimumValue={1}
                maximumValue={50}
                thumbTintColor={styles.primary.color}
              />
            </View>
            <ScrollView style={styles['flex.light']}>
              {sucursalesFiltradas.map((data, i) => {
                var cantPersonas;
                if (data.cantidadPersonas == 0) {
                  cantPersonas = "0"
                } else {
                  cantPersonas = data.cantidadPersonas
                }
                if (distancia > data.distanciaAPersona) {
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
                        colors: [styles.primary.color, styles.primary.color],
                        start: { x: 1, y: 3 },
                        end: { x: 0.1, y: 5 },
                      }}
                      //leftAvatar={{ rounded: true, source: { uri: avatar_url } }}

                      title={data.nombre}
                      subtitle={data.direccion + '\nDistancia: ' + data.distanciaAPersona.toFixed(1) + 'km'}
                      rightIcon={(
                        <Icon
                          name='person'
                          color='white'
                        />
                      )}
                      rightSubtitle={cantPersonas}
                      rightSubtitleStyle={{
                        color: styles.white.color,
                        fontFamily: 'Nunito',
                        fontSize: 20,
                      }}
                      subtitleStyle={{
                        color: styles.white.color,
                        fontFamily: 'Nunito',
                        width: '150%'
                      }}
                      key={data.sucursalId}
                      titleStyle={{
                        color: styles.white.color,
                        fontFamily: "Nunito_bold",
                        fontSize: 17,
                      }}
                      chevron={{ color: styles.white.color, size: 20 }}
                      onPress={(e) => {
                        //setSucursal(data)
                        //this.props.navigation.navigate('IngresoSintomas')
                        this.setState({
                          sucursalSelected: data,
                          isOverlayTurnoVisible: true
                        })
                      }}
                    />
                  );
                }
              })}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View
          style={styles['center-flex.white']}
        >
          <ActivityIndicator size="large" color={styles.primary.color} />
        </View>
      );
    }
  }
}
const mapStyles = StyleSheet.create({
  container: styles['center-flex.white'],
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    calcularDistancia: (datos, sucursales) => dispatch({ type: CALCULAR_DISTANCIA, data: datos, suc: sucursales }),
    setSucursal: (datos) => dispatch({ type: SET_SUCURSAL, data: datos }),
    guardarReserva: (datos) => dispatch({ type: GUARDAR_RESERVA, data: datos })
  };
};

const mapStateToProps = (state) => {
  return {
    idEspecialidad: state.turnos.idEspecialidad,
    idUsuario: state.user.idUsuario,
    ubicacion: state.user.ubicacion,
    sucursales: state.turnos.sucursales,
    sucursalesAMostrar: state.turnos.sucursalesAMostrar
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(ListaSucursales));
