import React, { Component, Fragment } from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Container, Header, Content, Card, Body, CardItem, List, ListItem, Text, Left, Right, Icon, View } from 'native-base';
import { Button, ThemeProvider } from 'react-native-elements';
import { withTheme } from 'react-native-elements';
import DatosTablas from './datosTablas'
import { URL_API } from '../constantes/urlApi'
import { Calendar, LocaleConfig, Agenda } from 'react-native-calendars';
import { ACTUALIZAR_TURNOS } from '../constantes/actionRedux'
import { connect } from 'react-redux';
import { MaterialHeaderButtons, Item } from '../../MyHeaderButton'
import { ArrowLeftIcon } from '@primer/octicons-react'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

const theme = {
  colors: {
    primary: 'rgb(4, 116, 186)'
  }
};

var diasReservados = {

}
var itemsDiasReservados = {

}
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
  today: 'Junio\'Vie'
};
LocaleConfig.defaultLocale = 'es';

class Turnos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnos: null,
      idUsuario: this.props.idUsuario,
      misTurnosReservados: null,
      misItemsTurnosReservados: null,
      recargarPagina: false
    };

  }


  /*navegar = () => {
    this.props.navigation.navigate("ListaTurnos");
  }*/
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mis turnos',
      /*headerRight: () => (
        
        <MaterialHeaderButtons>
          <Item iconName="list" onPress={()=>{navigation.navigate('MiCalendario')}} />        
        </MaterialHeaderButtons>
      ),*/
      headerStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'Nunito',
        color: 'black'
      },
    }
  };
  cancelarTurno = () => {
    this.props.navigation.navigate('Turnos')
  }

  async componentDidMount() {
    const idUsuario = this.state.idUsuario
    const state = this.state
    await fetch(URL_API + '/api/turno/consultarTurnosCliente/' + idUsuario)
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        myJson.forEach(j => {
          diasReservados[j.fechaProgramado] = { selected: true, marked: true, selectedColor: 'blue' }
          itemsDiasReservados[j.fechaProgramado] = [{ name: j.nombreTienda }, { sucursal: j.sucursal }, { horario: j.horario }]
        });
        this.setState({
          misTurnosReservados: diasReservados,
          misItemsTurnosReservados: itemsDiasReservados,
          turnos: myJson,
          recargarPagina: false
        })
        itemsDiasReservados = {

        }
        diasReservados = {

        }
      }.bind(this))
  }

  render() {
    debugger
    if (this.props.nuevoTurno) {
      this.setState({
        recargarPagina: true
      })
      this.props.actualizarTurnos()

    }
    const state = this.state

    const { theme, updateTheme, replaceTheme } = this.props;
    if (state.turnos != null) {
      if (state.turnos.length === 0) {
        return (

          <React.Fragment>
            <TouchableOpacity
              style={[styles.button], { height: 60, textAlignVertical: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary }}
              onPress={() => { this.props.navigation.navigate('ListaTiendas') }}
            >
              <Text style={{ color: 'white', fontFamily: 'Nunito' }}>Nuevo turno</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontFamily: 'Nunito' }}>
                No tiene turnos asignados
            </Text>

            </View>
          </React.Fragment>
        )
      }
      else {
        return (
          <React.Fragment>
            <TouchableOpacity
              style={[styles.button], { height: 60, textAlignVertical: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary }}
              onPress={() => { this.props.navigation.navigate('ListaTiendas') }}
            >
              <Text style={{ color: 'white', fontFamily: 'Nunito' }}>Nuevo turno</Text>
            </TouchableOpacity>
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
              {
                state.turnos.map((turno, i) => (
                  <DatosTablas data={turno} cancelar={this.cancelarTurno} key={turno.idTurno}></DatosTablas>
                ))
              }
            </ScrollView>
          </React.Fragment>
        )
      }
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito' }}>
          <ActivityIndicator size="large" color="#045ba3" />
        </View>
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actualizarTurnos: () => dispatch({ type: ACTUALIZAR_TURNOS, data: false }),
  };
}
const mapStateToProps = state => {
  return {
    idUsuario: state.user.idUsuario,
    nuevoTurno: state.user.nuevoTurno
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Turnos))
