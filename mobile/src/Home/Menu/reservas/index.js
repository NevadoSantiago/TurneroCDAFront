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

  realizarReserva = async () =>{
    const {idUsuario} = this.props
    await fetch(URL_API + '/api/reserva/crear/' + idUsuario ,{
      method: 'POST',
      body: JSON.stringify({
        descSintomas:"123123",
         sucursalId:"1",
         especialidadId:"1",
       })})
       .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        console.log(myJson)
       
  }
      )
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
{/*           <StyledInput
          onChangeText={(h) => this.mailIngresado(h)}
        /> */}
          <Button
          title="Probar"
          onPress={() => this.realizarReserva()}
        />

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
      idUsuario: state.user.idUsuario,
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Reservas))