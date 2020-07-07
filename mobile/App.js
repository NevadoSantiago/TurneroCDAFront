import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ReducerStore from './src/ruduxFile/store'
import HomeScreen from './src/Home'
import {ThemeProvider } from 'react-native-elements';
import Reservas from './src/Home/Menu/reservas'
import DatosTablas from './src/Home/Menu/reservas/datosTablas'
import ListaSucursales from './src/Home/Menu/reservas/listaSucursales'
import ListadoPaisesYProv from './src/Home/Menu/reservas/listadoPaisesYProv'
import ListaTiendas from './src/Home/Menu/reservas/listaTiendas'
import ListaTurnos from './src/Home/Menu/reservas/listaTurnos'
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import ListaEspecialidades from './src/Home/Menu/reservas/listaEspecialidades'

const theme = {
  colors: {
    primary: 'rgb(4, 116, 186)',
    success: '#48C774',
    warning: '#FFFC40',
    error: '#FF554D'
  },
  Button: {
    raised: true,
    //type: "clear",
    titleStyle: {
      fontFamily: 'Nunito'
    }
  },
  Input: {
    labelStyle: {
      fontFamily: 'Nunito'
    },
    inputStyle: {
      fontFamily: 'Nunito'
    },
    inputContainerStyle: {
      fontFamily: 'Nunito'
    }
  }
};

const AppNavigator = createStackNavigator(  
  {  
      Home: HomeScreen,  
      Reservas: Reservas,
      ListaTiendas: ListaTiendas,
      ListaSucursales: ListaSucursales,
      ListaTurnos: ListaTurnos,
      DatosTablas : DatosTablas,
      ListaEspecialidades : ListaEspecialidades,
      ListadoPaisesYProv : ListadoPaisesYProv, 
  },  
  {  
      initialRouteName: "Home"  
  }  
);  
const AppContainer = createAppContainer(AppNavigator); 

let store = createStore(ReducerStore);

export default class App extends React.Component{

  state = {
    isReady: false
  }

  componentDidMount = async() => {
    await Font.loadAsync({
      Nunito: require('./assets/fonts/NunitoSans-Regular.ttf'),
      Nunito_bold: require('./assets/fonts/NunitoSans-Bold.ttf')
    })
    this.setState({ isReady: true })
  }

  render() {
    if (this.state.isReady) {
      return (
        <Provider store = {store}>
          <ThemeProvider theme={theme}>
            <AppContainer/>
          </ThemeProvider>
        </Provider>
      );
    } else {
      return (
        <View>
          <StatusBar
            barStyle="light-content"
          />
          <AppLoading />
        </View>
      );
    }
  }
}
//export default App;