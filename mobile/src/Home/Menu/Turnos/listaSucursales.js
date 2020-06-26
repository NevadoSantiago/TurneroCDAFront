import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Card, CardItem, Body } from "native-base";
import QRCode from "react-native-qrcode-svg";
import CheckAlert from "react-native-awesome-alert";
import { URL_API, URL_API_TIENDA } from "../constantes/urlApi";
import { connect } from "react-redux";
import TouchableScale from "react-native-touchable-scale";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity } from "react-native";
import { withTheme, ListItem, Text } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import MapView from "react-native-maps";

var discoImg = require("../../img/DiscoIcon50.png");
var jumboImg = require("../../img/JumboIcon50.png");
var tienda = "Disco";
const imageWidth = Dimensions.get("window").width;

class ListaSucursales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sucursales: null,
            id: this.props.idUsuario
        }
    }

    static navigationOptions = {
        title: 'Seleccione una sucursal',
        headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0,
            shadowOpacity: 0,
        },
        headerTintColor: 'rgb(4, 116, 186)',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontFamily: 'Nunito',
            color: 'rgb(4, 116, 186)'
        },
    };

  static navigationOptions = {
    title: "Seleccione una sucursal",
    headerStyle: {
      backgroundColor: "#FFFFFF",
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: 'rgb(4, 116, 186)',
    headerTitleStyle: {
      fontWeight: 'normal',
      fontFamily: 'Nunito',
      color: 'rgb(4, 116, 186)'
    },
  };

  async componentDidMount() {
    const { tiendaId } = this.props.navigation.state.params;
    await fetch(URL_API + "/api/turno/consultarSucursalesPorTienda/" + tiendaId)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (myJson) {
          this.setState({
            sucursales: myJson,
            choosingSucursal: true,
          });
        }.bind(this)
      );
  }

  render() {
    const { sucursales } = this.state;
    const { theme, updateTheme, replaceTheme } = this.props;

    if (sucursales != null) {
      //const ruta = '../../../../assets/' + '${data.nombreTienda}' + '.jpg';
      return (
        <ScrollView style={{ flex: 1}}>
            <View>
            <SearchBar
              ref="searchBar"
              placeholder="Buscar direccion"
              lightTheme="true"
              showsCancelButtonWhileEditing={false}
              style={{ color: 'white' }}
            />
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: -34.612773,
                longitude: -58.448894,
                longitudeDelta: 0.02,
                latitudeDelta: 0.01,
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: -34.612773,
                  longitude: -58.448894,
                }}
                icon={discoImg}
                title={"Disco"}
                description={"Direccion: Peron 580"}
              ></MapView.Marker>
              <MapView.Marker
                coordinate={{
                  latitude: -34.6165874,
                  longitude: -58.4578435,
                }}
                icon={discoImg}
                title={"Disco"}
                description={"Direccion: Peron 580"}
              ></MapView.Marker>
              <MapView.Marker
                coordinate={{
                  latitude: -34.611986,
                  longitude: -58.4565245,
                }}
                icon={jumboImg}
                title={"Jumbo"}
                description={"Direccion: Peron 580"}
              ></MapView.Marker>
            </MapView>
          </View>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
              {sucursales.map((data, i) => {
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
                    subtitleStyle={{
                        color: 'white',
                        fontFamily: 'Nunito'
                    }}
                    key={data.sucursalId}
                    titleStyle={{
                      color: "white",
                      fontFamily: "Nunito_bold",
                      fontSize: 17,
                    }}
                    chevron={{ color: "white", size: 20 }}
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
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#045ba3" />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
    idUsuario: state.user.idUsuario,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(ListaSucursales));
