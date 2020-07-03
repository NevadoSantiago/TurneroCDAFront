import React, { Component } from "react";
import {
  View,
  Text,
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
import { withTheme, ListItem} from "react-native-elements";
import { SearchBar } from "react-native-elements";
import MapView from "react-native-maps";
import styles from '../../../../App.scss'
import MostrarEspecialidades from '../Mostrar/mostrarEspecialidades'

class ListaEspecialidades extends Component {
    constructor(props) {
        super(props);
    }

  render() {
      const {especialidades} = this.props
      if(especialidades == null){
          return (<View>
              <Text>
                  llego
              </Text>
          </View>)
      }else{

      
      especialidades.map((e, i) => {
        return (
            <View>
                <Text>Entro</Text>
            <MostrarEspecialidades especialidad = {e}> 

            </MostrarEspecialidades> 
            </View>
        )
      })
}}
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    especialidades : state.turnos.listaEspecialidades,
    idUsuario: state.user.idUsuario,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(ListaEspecialidades));

