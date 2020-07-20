import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { Button, Overlay, ButtonGroup } from 'react-native-elements'
import { MAP_STYLE } from '../constantes/mapStyle'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { URL_API_RESERVA } from '../constantes/urlApi'
import style from '../../../../App.scss'
import { RESERVA_CANCELADA } from '../constantes/actionRedux'

//import { useTheme } from '@react-navigation/native';
import { withTheme } from 'react-native-elements';
import { Row } from 'native-base';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const MostrarReserva = (props) => {
  const { turno } = props
  //const theme = useTheme();

  const initialMapState = {
    //markers,
    isVisible: false,
    selectedIndex: null,
    markers: [
      {
        coordinate: {
          latitude: parseFloat(turno.latitud),
          longitude: parseFloat(turno.longitud),
        },
        title: turno.nombreSucursal,
        description: turno.direccion
      }
    ],
    region: {
      latitude: parseFloat(turno.latitud),
      longitude: parseFloat(turno.longitud),
      latitudeDelta: 0.0012,
      longitudeDelta: 0.01,
    },
  };
  async function cancelarReserva() {
    var url;

    url = URL_API_RESERVA + "/api/reserva/cancelar/" + turno.idReserva
    console.log(url)
    await fetch(url, {
      method: 'POST'
    })
      .then(function (response) {
        return response.json();
      })
      .then(
        function (myJson) {
          { props.cancelar() }
          props.nav.navigate("ListaEspecialidades")
        }.bind(this)
      );

  }

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const updateIndex = (selectedIndex) => {

    switch (selectedIndex) {
      case 0: // DISTANCIA 
        setState({
          isVisible: false,
          markers: state.markers
        })
        break;
      case 1: // Personas en cola
        setState({
          isVisible: false,
          markers: state.markers
        })
        break;
      case 2: //NOMBRE
        setState({
          isVisible: false,
          markers: state.markers
        })
        break;
      default:
        break;
    }
    setState({ selectedIndex, markers: state.markers })
  }

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    //_scrollView.current.scrollTo({ x: x, y: 0, animated: true })
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const apiQR = URL_API_RESERVA + '/api/reserva/QR/' + turno.idReserva;
  return (
    <View style={styles.container}>
      <Overlay
        isVisible={state.isVisible}
        onBackdropPress={() => { setState({ isVisible: false, markers: state.markers }) }}
        overlayStyle={{ padding: -100, width: '75%' }}
      >
        <React.Fragment>
          <Text style={{ alignSelf: 'center', padding: 15, fontFamily: 'Nunito_bold', fontSize: 19 }}>
            Código QR
        </Text>
          <View style={{ height: 240 }}>
            <Image
              source={{ uri: apiQR }}
              style={{ width: '100%', height: '100%', alignSelf: 'center', marginTop: -10 }}
            >
            </Image>
          </View>
          <ButtonGroup
            onPress={() => { setState({ isVisible: false, markers: state.markers }) }}
            selectedIndex={state.selectedIndex}
            buttons={['OK']}
            containerStyle={{ height: 45, width: '100%', alignSelf: 'center', marginBottom: 0, marginTop: 0, borderWidth: 0, borderRadius: 0, borderBottomEndRadius: 3, borderBottomStartRadius: 3, borderTopWidth: 2, borderTopColor: style.dark.color }}
            textStyle={{ fontFamily: 'Nunito' }}
            vertical={true}
          />
        </React.Fragment>
      </Overlay>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MAP_STYLE}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)} title={turno.nombreSucursal} description={turno.direccion}>
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
        ref={_scrollView}
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
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              <Text numberOfLines={1} style={styles.cardtitle}>-</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>{turno.sintomas}</Text>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.qr} onPress={() => { console.log(state.markers), setState({ isVisible: true, markers: state.markers }) }}>
                  <Image
                    source={{ uri: apiQR }}
                    style={{ width: '100%', height: '100%' }}
                  >
                  </Image>
                </TouchableOpacity>
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
                        { text: 'SI', onPress: () => cancelarReserva() },
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
  );
};
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "white",
    //borderTopLeftRadius: 5,
    //borderTopRightRadius: 5,
    borderRadius: 5,
    marginHorizontal: -10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    // flexDirection: 'row',
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    padding: 10,

  },
  cardtitle: {
    fontSize: 17,
    // marginTop: 5,
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
  qr: {
    alignSelf: 'flex-end',
    backgroundColor: 'whitesmoke',
    width: '35%',
    height: '210%',
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
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
