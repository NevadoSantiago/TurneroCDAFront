import React, { Component } from 'react'
import { View, ActivityIndicator, Container, ScrollView } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import CheckAlert from "react-native-awesome-alert"
import { URL_API, URL_API_TIENDA } from '../constantes/urlApi'
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import Calendario from './calendario'

import MostrarMisTurnos from "./mostrarMisTurnos"

import { withTheme, ListItem, Text, Button } from 'react-native-elements';
import { OBTENER_TURNOS, LIMPIAR_SESION } from '../constantes/actionRedux';
import { NavigationEvents } from 'react-navigation';

var daySelected = '1'
var dots = []

class MiCalendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservados: null,
      id: this.props.idUsuario,
      diasReservadosState: null,
      turnosFiltrados: null,
      dotsActualizados: false,
      date: moment().format("YYYY-MM-DD")
    }
  }
  cancelarTurno = () => {
    this.props.navigation.navigate('Turnos')
  }

  cerrarSesion = () => {
    this.props.limpiarSesion
    this.props.navigation.navigate("Home")
  }

  static navigationOptions = {
    title: 'Mis turnos',
    headerStyle: {
      backgroundColor: '#FFFFFF',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitleStyle: {
      fontWeight: 'normal',
      fontFamily: 'Nunito'
    },
  };

  filtrarDias = () => {
    const { turnosAsignados } = this.props
    var diasReservados = {}
    dots = []
    turnosAsignados.map((t, i) => {
      switch (t.nombreTienda) {
        case 'Disco':
          const discoDot = { key: t.nombreTienda + ' - ' + t.idTurno, color: '#FF554D', selectedDotColor: '#FF554D' }
          dots.push(discoDot)
          break;
        case 'Jumbo':
          const jumboDot = { key: t.nombreTienda + ' - ' + t.idTurno, color: '#48C774', selectedDotColor: '#48C774' }
          dots.push(jumboDot)
          break;
        case 'Easy':
          const easyDot = { key: t.nombreTienda + ' - ' + t.idTurno, color: 'orange', selectedDotColor: 'orange' }
          dots.push(easyDot)
          break;
        default:
          const defaultDot = { key: 'unknown', color: 'black', selectedDotColor: 'black' }
          dots.push(defaultDot)
          break;
      }
      diasReservados[t.fechaProgramado] = { dots: dots, marked: true, selectedColor: "blue" }
      if (i < turnosAsignados.length && i != turnosAsignados.length - 1) {
        if ((turnosAsignados[i + 1].fechaProgramado != t.fechaProgramado)) {
          dots = []
        }
      }
    })
    return diasReservados
  }

  showDateString = (date) => {
    var today = moment().format("YYYY-MM-DD")
    var finalDate = moment(date).format("YYYY-MM-DD")

    if (moment(today).isSame(finalDate)) {
      return (
        <View style={{}}>
          <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Hoy</Text>
        </View>
      )
    }
    if (moment(today).isBefore(finalDate) && (moment(today).day() === (moment(finalDate).day() - 1)) && moment(today).month() === (moment(finalDate).month())) {
      return (
        <View style={{}}>
          <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Mañana</Text>
        </View>
      )
    } else {
			/* DEBUG
			console.log('DATE SELECTED: ' + finalDate )
			console.log('DATE TODAY: ' + today )
			console.log(moment(today).day())
			console.log(moment(finalDate).day())
			console.log(moment(today).day() === (moment(finalDate).day() - 1))
			console.log(moment(today).isBefore(finalDate))*/
      console.log(moment(finalDate).day())
      switch (moment(finalDate).day()) {
        case 0:
          return (
            <View style={{}}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Domingo</Text>
            </View>
          )
        case 1:
          return (
            <View style={{}}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Lunes</Text>
            </View>
          )
        case 2:
          return (
            <View style={{}}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Martes</Text>
            </View>
          )
        case 3:
          return (
            <View style={{}}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Miércoles</Text>
            </View>
          )
        case 4:
          return (
            <View style={{}}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Jueves</Text>
            </View>
          )
        case 5:
          return (
            <View style={{}}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Viernes</Text>
            </View>
          )
        case 6:
          return (
            <View style={{}}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Sabado</Text>
            </View>
          )
        default:
          break;
      }
    }
  }

  render() {
    const { date } = this.state
    const { turnosAsignados, loadingTurnos, diaCalendario } = this.props;
    const { theme, updateTheme, replaceTheme } = this.props;
    var turnosFiltrados = null
    if (!loadingTurnos) {
      turnosFiltrados = turnosAsignados.filter(t => t.fechaProgramado === diaCalendario)
      return (
        <React.Fragment>
          <Calendario
            turnosAsignados={this.filtrarDias()}
            date={date}
          />
          <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ backgroundColor: 'white', height: 40, flexDirection: 'row' }}>
              {
                this.showDateString(diaCalendario)
              }
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, marginRight: 15, marginTop: 15, fontFamily: 'Nunito', alignSelf: 'flex-end' }}>{diaCalendario}</Text>
              </View>
            </View>
            <MostrarMisTurnos
              turnos={turnosFiltrados}
              daySelected={diaCalendario}
            />
          </ScrollView>

          <ListItem
            Component={TouchableScale}
            containerStyle={{}}
            friction={90}
            tension={100}
            activeScale={0.95}
            linearGradientProps={{
              colors: [theme.colors.primary, theme.colors.primary],
              start: { x: 1, y: 0 },
              end: { x: 0, y: 5 },
            }}
            title='Nuevo turno'
            key='-1'
            titleStyle={{ color: 'white', fontFamily: 'Nunito', fontSize: 17, textAlign: 'center' }}
            //rightIcon={{ name: 'add', color: 'white' }}
            onPress={() => this.props.navigation.navigate('ListaTiendas')}
          />
        </React.Fragment>
      )
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#045ba3" />
        </View>
      )
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    limpiarSesion: () => dispatch({ type: LIMPIAR_SESION }),
  };
}

const mapStateToProps = state => {
  return {
    idUsuario: state.user.idUsuario,
    turnosAsignados: state.turnos.turnosAsignados,
    loadingTurnos: state.turnos.loading,
    diaCalendario: state.turnos.diaCalendario
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MiCalendario))