import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { Button, Overlay, ButtonGroup, Icon } from 'react-native-elements'
import { MAP_STYLE } from '../constantes/mapStyle'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { URL_API_RESERVA } from '../constantes/urlApi'
import style from '../../../../App.scss'
import { withTheme } from 'react-native-elements';

let mapIndex = 0;
let mapAnimation = new Animated.Value(0);
const { width } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

class MostrarReserva extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selectedIndex: null,
      markers: [
        {
          coordinate: {
            latitude: parseFloat(this.props.turno.latitud),
            longitude: parseFloat(this.props.turno.longitud),
          },
          title: this.props.turno.nombreSucursal,
          description: this.props.turno.direccion
        }
      ],
      region: {
        latitude: parseFloat(this.props.turno.latitud),
        longitude: parseFloat(this.props.turno.longitud),
        latitudeDelta: 0.0012,
        longitudeDelta: 0.01,
      }
    }
  }

  cancelarReserva = async () => {
    const { turno } = this.props
    var url = URL_API_RESERVA + "/api/reserva/cancelar/" + turno.idReserva
    
    console.log(url)
    await fetch(url, {
      method: 'POST'
    })
      .then(function (response) {
        return response.json();
      })
      .then(
        function () {
          { this.props.cancelar() }
          this.props.navigation.navigate("ListaEspecialidades")
        }.bind(this)
      );
  }

  useEffect = () => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = this.state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  };

  onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
  }

  render() {
    const { isVisible, selectedIndex, region, markers } = this.state
    const { turno } = this.props
    return (
      <View style={styles.container}>
        <Overlay
          isVisible={isVisible}
          onBackdropPress={() => { this.setState({ isVisible: false, markers: markers }) }}
          overlayStyle={{ padding: -100, width: '75%' }}
        >
          <React.Fragment>
            <Text style={{ alignSelf: 'center', padding: 15, fontFamily: 'Nunito_bold', fontSize: 19 }}>
              Código QR
        </Text>
            <View style={{ height: 240 }}>
              <Image
                source={{ uri: URL_API_RESERVA + '/api/reserva/QR/' + turno.idReserva }}
                style={{ width: '100%', height: '100%', alignSelf: 'center', marginTop: -10 }}
              >
              </Image>
            </View>
            <ButtonGroup
              onPress={() => { this.setState({ isVisible: false, markers: markers }) }}
              selectedIndex={selectedIndex}
              buttons={['OK']}
              containerStyle={{ height: 45, width: '100%', alignSelf: 'center', marginBottom: 0, marginTop: 0, borderWidth: 0, borderRadius: 0, borderBottomEndRadius: 3, borderBottomStartRadius: 3, borderTopWidth: 2, borderTopColor: style.dark.color }}
              textStyle={{ fontFamily: 'Nunito' }}
              vertical={true}
            />
          </React.Fragment>
        </Overlay>
        <MapView
          initialRegion={region}
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MAP_STYLE}
        >
          {markers.map((marker, index) => {
            const scaleStyle = {
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => this.onMarkerPress(e)} title={turno.nombreSucursal} description={turno.direccion}>
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={require('../../../../assets/map_marker.png')}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>

        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  }
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          {markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
                <View>
                  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                    <Text numberOfLines={1} style={styles.cardtitle}>-</Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>{turno.sintomas}</Text>
                  </View>
                  <View style={{ alignSelf: 'flex-end', marginTop: -10, marginRight: -7 }}>
                    <Icon
                      raised
                      name='qrcode'
                      type='font-awesome'
                      color={style.black.color}
                      onPress={() => { console.log(markers), this.setState({ isVisible: true, markers: markers }) }} />
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <Button
                    buttonStyle={{ backgroundColor: style.secondary.color, borderRadius: 15, height: 50 }}
                    titleStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'Nunito_bold',
                      width: '100%'
                    }}
                    title="Cancelar turno"
                    onPress={() => {
                      Alert.alert('Cancelar', '¿Seguro que desea cancelar la reserva?',
                        [
                          { text: 'SI', onPress: () => this.cancelarReserva() },
                          { text: 'NO', onPress: () => { console.warn('NO pressed') } }
                        ]
                      )
                    }}
                  ></Button>
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: -10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  textContent: {
    flex: 1,
    padding: 10
  },
  cardtitle: {
    fontSize: 17,
    alignSelf: 'flex-start',
    paddingBottom: 5,
    fontFamily: 'Nunito_bold',
  },
  cardDescription: {
    fontFamily: 'Nunito',
    fontSize: 13,
    alignSelf: 'flex-start',
    paddingBottom: 5,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
});

const mapDispatchToProps = dispatch => {
  return {
  };
}

const mapStateToProps = state => {
  return {
    reserva: state.user.reserva,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(MostrarReserva));