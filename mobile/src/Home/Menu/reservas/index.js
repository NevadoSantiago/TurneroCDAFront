import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import MostrarReserva from '../Mostrar/mostrarReserva'
import { withTheme, Button } from 'react-native-elements';
import styles from '../../../../App.scss'
import {OBTENER_ESPECIALIDADES} from '../constantes/actionRedux'
import ListaEspecialidades from './listaEspecialidades'
import { URL_API_ESPECIALIDAD} from '../constantes/urlApi'
import listaEspecialidades from './listaEspecialidades';


class Reservas extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Reservas',
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
    const { reserva } = this.props
      return (
        <MostrarReserva turno={reserva}></MostrarReserva>
      )
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  };
}

const mapStateToProps = state => {
  return {
    reserva: state.user.reserva,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Reservas))