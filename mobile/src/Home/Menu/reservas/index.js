import React, { Component } from 'react'
import { View } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import MostrarReserva from '../Mostrar/mostrarReserva'
import { withTheme, Text } from 'react-native-elements';

class Reservas extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {reserva} = this.props
   console.log(reserva)
    if (reserva == null) {
      return (
        <View>
            <Text>
                Aqui se mostraran sus turnos
            </Text>    
        </View>
      )
    }
    else {
      return (
       
          <MostrarReserva  turno = {reserva}></MostrarReserva>
        
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