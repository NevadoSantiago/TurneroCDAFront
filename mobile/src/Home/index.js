import React from 'react';
import { View, Text, Image, StatusBar,TextInput,StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { withTheme } from 'react-native-elements';
import { INICIAR_SESION } from './Menu/constantes/actionRedux'
import { connect } from 'react-redux';
import { URL_API_USUARIO } from './Menu/constantes/urlApi'
import styled from 'styled-components';

const datosIngresados = {
  mail: null
}

const theme = {
  colors: {
    primary: 'rgb(4, 116, 186)'
  }
};

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
    };
  }

  static navigationOptions = {
    title: 'Turnero',
    headerStyle: {
      backgroundColor: theme.colors.primary,
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS

    },
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
    await fetch(URL_API_USUARIO + '/api/usuario/ingresar/' + datosIngresados.mail, {
      method: 'POST',
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        console.log(myJson)
        this.setState({
          id: myJson
        })
      }.bind(this))
  }

  render() {
    //const { theme, updateTheme, replaceTheme } = this.props;
    const { iniciarSesion, mail } = this.props
    const state = this.state
    if (state.id != null) {
      iniciarSesion(state.id)
      this.props.navigation.navigate('Turnos')
    }
    return (
      <View style={{ flex: 1,backgroundColor:"#FFFFFF", alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar
          backgroundColor= 'white' 
          barStyle="dark-content"
        />
        <Image 
          style={{ width: 250,marginBottom:100 ,height: 100, flex: 0.25 }}
          source={require('./img/InicioCda.png')}
        />
        <Text style={{ marginLeft: '5%', textAlign: 'left', alignSelf: 'stretch', fontFamily: 'Nunito' }}>Correo electrónico</Text>
        <StyledInput 
          onChangeText={(h) => this.mailIngresado(h)}
        />
        <Text />
        <Text style={{ marginLeft: '5%', textAlign: 'left', alignSelf: 'stretch', fontFamily: 'Nunito' }}>Contraseña</Text>
        <StyledInput secureTextEntry = {true} 
          
        />
        <Text />
        <Button
          titleStyle={{ justifyContent: 'center', alignItems: 'center', width: '90%' }}
          title="Ingresar"
          onPress={() => this.realizarLogueo()}
        />
        <Text>{mail}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    iniciarSesion: (id) => dispatch({ type: INICIAR_SESION, data: id }),
  };
}
const mapStateToProps = state => {
  return {
    idUsuario: state.user.idUsuario,
    mail: state.user.mail
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HomeScreen))