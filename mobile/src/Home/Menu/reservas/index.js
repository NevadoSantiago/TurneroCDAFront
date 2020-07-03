import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import MostrarReserva from '../Mostrar/mostrarReserva'
import { withTheme } from 'react-native-elements';
import styles from '../../../../App.scss'

class Reservas extends Component {
  constructor(props) {
    super(props);
    this.state = {

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

  render() {
    const { reserva } = this.props
    console.log("--------RESERVA--------")
    console.log(reserva)
    console.log("-----------------------")
    if (reserva === null) {
      return (
        <View style={styles['center-flex.white']}>
          <Text style={styles.text}>
            No hay reservas
          </Text>
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
  };
}

const mapStateToProps = state => {
  return {
    reserva: state.user.reserva,
    loadingTurnos: state.user.loading,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Reservas))