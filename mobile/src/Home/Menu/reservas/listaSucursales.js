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
import { withTheme, ListItem, Icon } from "react-native-elements";
import { SearchBar, Button, ButtonGroup, Overlay } from "react-native-elements";
import MapView from "react-native-maps";
import styles from '../../../../App.scss'
import { getDistance } from 'geolib';
import { Slider } from 'react-native';

const imageWidth = Dimensions.get("window").width;

class ListaSucursales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucursalesFiltradas: this.props.sucursales,
      idEspecialidad: this.props.idEspecialidad,
      idUsuario: this.props.idUsuario,
      isVisible: false,
      selectedIndex: null,
      distancia: 0,
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

  render() {
    const { theme, updateTheme, replaceTheme, ubicacion, sucursales } = this.props;
    const { selectedIndex } = this.state

    const { distancia, sucursalesFiltradas } = this.state
    var latitude, longitude
    if (ubicacion == null) {
      latitude = -34.6098896
      longitude = -58.4612702
    } else {
      latitude = ubicacion.coords.latitude
      longitude = ubicacion.coords.longitude
    }

    console.log(sucursales)

    if (sucursales != null) {

      return (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Overlay
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
            overlayStyle={{ padding: -100, width: '75%' }}
          >
            <Text style={{ alignSelf: 'center', padding: 15, fontFamily: 'Nunito' }}>
              Filtrar lista de sucursales
            </Text>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={['Distancia', 'Nombre', 'Cantidad de personas']}
              containerStyle={{ height: 120, width: '100%', alignSelf: 'center', marginBottom: 0, marginTop: 0, borderWidth: 0, borderRadius: 0, borderBottomEndRadius: 3, borderBottomStartRadius: 3, borderTopWidth: 2, borderTopColor: styles.dark.color }}
              textStyle={{ fontFamily: 'Nunito' }}
              vertical={true}
            />
          </Overlay>
          <ScrollView style={styles['flex-white']}>
            <View style={styles['flex-white']}>
              {<SearchBar
                ref="searchBar"
                placeholder="Buscar sucursal"
                lightTheme="true"
                showsCancelButtonWhileEditing={true}
                style={styles.white.color}
              />}
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

                  sucursales.map((s, i) => {

                    var latitudSucursal = s.configuracion.cordLatitud
                    var longitudSucursal = s.configuracion.cordLongitud
                    var longitud = getDistance(ubicacion.coords,
                      { latitude: latitudSucursal, longitude: longitudSucursal })
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
              <Text>{distancia} km</Text>
              <Slider
                style={{ width: imageWidth, height: 50 }}
                onValueChange={(value) => this.setState({
                  distancia: value
                })}
                onSlidingComplete={(value) => this.filtrarSucursalesDistancia(value)}
                minimumValue={1}
                maximumValue={50}
                minimumTrackTintColor="#0000FF"
                maximumTrackTintColor="#FFFFF0"
              />
              <ScrollView style={styles['flex.light']}>
                {sucursales.map((data, i) => {
                  var cantPersonas;
                  if (data.cantidadPersonas == 0) {
                    cantPersonas = "0"
                  } else {
                    cantPersonas = data.cantidadPersonas
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
                        colors: [theme.colors.primary, theme.colors.primary],
                        start: { x: 1, y: 3 },
                        end: { x: 0.1, y: 5 },
                      }}
                      //leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
                      title={data.nombre}
                      subtitle={data.direccion}
                      rightIcon={(
                        <Icon
                          name='person'
                        />
                      )}
                      rightSubtitle={cantPersonas}
                      rightSubtitleStyle={{
                        color: styles.white.color,
                        fontFamily: 'Nunito',
                        fontSize: 20
                      }}
                      subtitleStyle={{
                        color: styles.white.color,
                        fontFamily: 'Nunito'
                      }}
                      key={data.sucursalId}
                      titleStyle={{
                        color: styles.white.color,
                        fontFamily: "Nunito_bold",
                        fontSize: 17,
                      }}
                      chevron={{ color: styles.white.color, size: 20 }}
                      onPress={(e) => {
                        this.props.navigation.navigate("ListaTurnos", {
                          sucursalId: data.sucursalId,
                        });
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>
          <Button
            containerStyle={{ marginHorizontal: 10, position: 'absolute', bottom: 15 }}
            buttonStyle={{ backgroundColor: styles.secondary.color, borderRadius: 15, height: 50 }}
            titleStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Nunito_bold',
              width: '100%'
            }}
            title='Filtrar lista de sucursales'
            onPress={() => {
              this.setState({
                isVisible: true
              })
            }}
          />
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
  return {};
};

const mapStateToProps = (state) => {
  return {
      idEspecialidad: state.turnos.idEspecialidad,
      idUsuario: state.user.idUsuario,
      ubicacion: state.user.ubicacion,
      sucursales: state.turnos.sucursales
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(ListaSucursales));
