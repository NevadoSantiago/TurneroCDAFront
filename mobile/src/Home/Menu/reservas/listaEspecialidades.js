import React, { Component } from "react";
import {
  View,
  Text,
} from "react-native";
import {  URL_API_ESPECIALIDAD } from "../constantes/urlApi";
import { connect } from "react-redux";
import TouchableScale from "react-native-touchable-scale";
import { withTheme, ListItem} from "react-native-elements";

import styles from '../../../../App.scss'
import MostrarEspecialidades from '../Mostrar/mostrarEspecialidades'
import { ScrollView } from "react-native-gesture-handler";

class ListaEspecialidades extends Component {
    constructor(props) {
        super(props);
    }

  render() {
      const {especialidades} = this.props
      if(especialidades == null){
          return (
            <View>
              <Text>
                No hay especialidades
              </Text>
          </View>)
      }else{ 
        return(
          <ScrollView>
            {this.props.especialidades.map((e, i) => (
              <MostrarEspecialidades especialidad = {e}/> 
                )
              )   
            }
          </ScrollView>
        )      
      }
    }
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

