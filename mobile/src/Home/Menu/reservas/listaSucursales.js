import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MAP_STYLE } from "../constantes/mapStyle";
import { connect } from "react-redux";
import TouchableScale from "react-native-touchable-scale";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity } from "react-native";
import { withTheme, ListItem, Icon } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import MapView from "react-native-maps";
import styles from '../../../../App.scss'

const imageWidth = Dimensions.get("window").width;

class ListaSucursales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucursales: null,
      idEspecialidad: this.props.idEspecialidad,
      idUsuario: this.props.idUsuario
    }
  }
  mostrarMarcadores = () => {
    const { sucursales } = this.props
    sucursales.map((s, i) => {
      return (
        <MapView.Marker
          coordinate={{
            latitude: -34.612773,
            longitude: -58.448894,
          }}
          title={"Disco"}
          description={"Direccion: Peron 580"}
        ></MapView.Marker>
      )
    }
    )
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

  render() {
    const { theme, updateTheme, replaceTheme, ubicacion, sucursales } = this.props;
    var latitude, longitude
    if (ubicacion == null) {
      latitude = -34.6098896
      longitude = -58.4612702
    } else {
      latitude = ubicacion.coords.latitude
      longitude = ubicacion.coords.longitude
    }


    if (sucursales != null) {
      return (
        <ScrollView style={ styles['flex-white'] }>
          <View style={ styles['flex-white'] }>
            {<SearchBar
              ref="searchBar"

              placeholder="Buscar direccion"
              lightTheme="true"
              showsCancelButtonWhileEditing={false}
              style={styles.white.color}
            />}
            <MapView
              style={mapStyles.mapStyle}
              showsUserLocation={true}
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
              {
                sucursales.map((s, i) => {
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
            <ScrollView style={styles['flex.light']}>
              {sucursales.map((data, i) => {
                console.log(data)
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
                    rightSubtitle={data.cantidadPersonas}
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
