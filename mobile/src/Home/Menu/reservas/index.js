import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import MostrarReserva from '../Mostrar/mostrarReserva'
<<<<<<< HEAD
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
=======
import { withTheme, Button } from 'react-native-elements';
import styles from '../../../../App.scss'
import {OBTENER_ESPECIALIDADES} from '../constantes/actionRedux'
import listaEspecialidades from './listaEspecialidades';
import {URL_API} from '../constantes/urlApi'

>>>>>>> 05225791ea58809ad3aef04001838b92418f3406

class Reservas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      especialidadesGuardadas : false,
    }
  }

<<<<<<< HEAD
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

=======
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
>>>>>>> 05225791ea58809ad3aef04001838b92418f3406
        </View>
      )
    }
    else {
<<<<<<< HEAD
      return (       
          <MostrarReserva turno = {reserva}></MostrarReserva>      
=======
      return (
        <MostrarReserva turno={reserva}></MostrarReserva>
>>>>>>> 05225791ea58809ad3aef04001838b92418f3406
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
<<<<<<< HEAD
    return {
    };
  }
  
  const mapStateToProps = state => {
    return {
      reserva: state.user.reserva,
      loadingTurnos: state.user.loading,
      idUsuario: state.user.idUsuario,
    }
=======
  return {
    guardarEspecialidades: (datos) => dispatch({ type: OBTENER_ESPECIALIDADES, data: datos }),
    
  };
}

const mapStateToProps = state => {
  return {
    reserva: state.user.reserva,
    loadingTurnos: state.user.loading,
    Cargando : state.turnos.Cargando,
>>>>>>> 05225791ea58809ad3aef04001838b92418f3406
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Reservas))