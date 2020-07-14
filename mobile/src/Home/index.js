import React from 'react';
import { View, Text, Image, StatusBar, TextInput, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { withTheme } from 'react-native-elements';
import { INICIAR_SESION, LIMPIAR_SESION,OBTENER_ESPECIALIDADES } from './Menu/constantes/actionRedux'
import { connect } from 'react-redux';
import styles from "../../App.scss";
import { URL_API_USUARIO, URL_API_ESPECIALIDAD } from './Menu/constantes/urlApi'

import styled from 'styled-components';

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
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      logueado: false,
      especialidadesGuardadas: false
    };
  }

  static navigationOptions = {
    headerShown: false,
    headerTitleStyle: {
      fontWeight: 'normal',
      fontFamily: 'Nunito'
    },
  };
  mailIngresado = (mail) => {
    datosIngresados.mail = mail
  }

  async realizarLogueo() {

    const { iniciarSesion } = this.props
    await fetch(URL_API_USUARIO + '/api/usuario/ingresar/' + datosIngresados.mail, {
      method: 'POST',
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        console.log(myJson)
        iniciarSesion(myJson)
        this.getEspecialidades()
        this.setState({
          logueado: true
        })

      }.bind(this))
  }
  getEspecialidades = async() => {
    const { guardarEspecialidades } = this.props
    await fetch(URL_API_ESPECIALIDAD + "/api/especialidad") 
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
    const {loading, theme,reserva } = this.props
    const { logueado,especialidadesGuardadas } = this.state
    if (!loading && logueado && especialidadesGuardadas) {
      if(reserva === null){
        this.props.navigation.navigate('ListaEspecialidades')
      }else{
        this.props.navigation.navigate('Reservas')
      }
      
    }
    return (
      <View style={ styles['center-flex.white'] }>
        <StatusBar
          backgroundColor={ styles.white.color }
          barStyle="dark-content"
        />
        <Image
          style={{ width: 250, marginBottom: 100, height: 100, flex: 0.25 }}
          source={require('./img/InicioCda.png')}
        />
        <Text style={ styles['input-label-text'] }>Correo electrónico</Text>
        <StyledInput
          onChangeText={(h) => this.mailIngresado(h)}
        />
        <Text />
        <Text style={ styles['input-label-text'] }>Contraseña</Text>
        <StyledInput secureTextEntry={true}

        />
        <Text />
        <Button
          buttonStyle={{ backgroundColor: theme.colors.primary }}
          titleStyle={ styles['button-center'] }
          title="Ingresar"
          onPress={() => this.realizarLogueo()}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    iniciarSesion: (id) => dispatch({ type: INICIAR_SESION, data: id }),
    limpiarSesion: () => dispatch({ type: LIMPIAR_SESION }),
    guardarEspecialidades: (datos) => dispatch({ type: OBTENER_ESPECIALIDADES, data:datos }),
  };
}
const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    reserva: state.user.reserva,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HomeScreen))