import React, { Component } from 'react'
import { connect } from 'react-redux';
import MostrarReserva from '../Mostrar/mostrarReserva'
import {URL_API} from '../constantes/urlApi'
import { withTheme, Button,Input } from 'react-native-elements';
import styled from 'styled-components';
import {View, Text} from "react-native"

const datosIngresados = {
  mail: null
}

const StyledInput = styled(Input).attrs({
  textAlign: 'left',
  containerStyle: {
    marginBottom: -30,
    width: '95%',
    fontFamily: 'Nunito'
  },
  labelStyle: {
    fontFamily: 'Nunito'
  },
  inputContainerStyle: {
    fontFamily: 'Nunito'
  },
})``;

class Reservas extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {reserva} = this.props
   console.log(reserva)
    if (reserva === null) {
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
          <MostrarReserva turno = {reserva}></MostrarReserva>      
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