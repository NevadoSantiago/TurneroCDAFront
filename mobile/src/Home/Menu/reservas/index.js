import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import MostrarReserva from '../Mostrar/mostrarReserva'
import { withTheme, Button } from 'react-native-elements';
import styles from '../../../../App.scss'
import {OBTENER_ESPECIALIDADES} from '../constantes/actionRedux'
import listaEspecialidades from './listaEspecialidades';
import {URL_API} from '../constantes/urlApi'


class Reservas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      especialidadesGuardadas : false,
    }
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

  getEspecialidades = async() => {
    console.log("hola")
    const { guardarEspecialidades } = this.props
    await fetch(URL_API + "/api/especialidad") 
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        guardarEspecialidades(myJson)
        this.setState({
          especialidadesGuardadas : true,
        })

      }.bind(this))
  }

  render() {
    const {Cargando} = this.props
    const {especialidadesGuardadas} = this.state
    if(!Cargando && especialidadesGuardadas){
      this.props.navigation.navigate('ListaEspecialidades')
    }
    const { reserva } = this.props
    if (reserva === null) {
      return (
        <View style={styles['center-flex.white']}>
          <Text style={styles.text}>
            No hay reservas
          </Text>
          <Button
           title="Nueva Reserva"
           onPress={() => this.getEspecialidades()}
          >
          </Button>
        </View>
      )
    }
    else {
      return (
        <MostrarReserva turno={reserva}></MostrarReserva>
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    guardarEspecialidades: (datos) => dispatch({ type: OBTENER_ESPECIALIDADES, data: datos }),
    
  };
}

const mapStateToProps = state => {
  return {
    reserva: state.user.reserva,
    loadingTurnos: state.user.loading,
    Cargando : state.turnos.Cargando,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Reservas))