import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import MostrarReserva from '../Mostrar/mostrar'
import { withTheme, Button } from 'react-native-elements';
import styles from '../../../../App.scss'
import { RESERVA_CANCELADA, LIMPIAR_SESION } from '../constantes/actionRedux'

class Reservas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seCanceloReserva: false,
    }
  }

  salir = () => {
    console.log("SALIO")
    const { cerrarSesion } = this.props
    this.props.navigation.navigate("Home")
    cerrarSesion()
  }

  static navigationOptions = () => {
    return {
      title: 'Mis reservas',
      headerStyle: {
        backgroundColor: styles.white.color,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerLeft: () => null,
      headerTintColor: styles.primary.color,
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'Nunito',
        color: styles.primary.color
      },
    }
  };

  cancelarRes = () => {
    const { cancelarReserva } = this.props
    this.setState({
      seCanceloReserva: true
    })
    cancelarReserva()
  }

  render() {
    const { reserva } = this.props
    const { seCanceloReserva } = this.state
    if (!seCanceloReserva && reserva != null) {
      return (
        <React.Fragment>
          <Button
            buttonStyle={{ borderRadius: -50 }}
            title="Salir"
            onPress={() => { this.salir() }} >
          </Button>
          <MostrarReserva turno={reserva} nav={this.props.navigation} cancelar={this.cancelarRes}></MostrarReserva>
        </React.Fragment>
      )
    } else {
      this.props.navigation.navigate("Home")
      return (
        <View>
          <Text>
            No tiene reservas
          </Text>
        </View>
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelarReserva: () => dispatch({ type: RESERVA_CANCELADA }),
    cerrarSesion: () => dispatch({ type: LIMPIAR_SESION }),
  };
}

const mapStateToProps = state => {
  return {
    reserva: state.user.reserva,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Reservas))