import React, { Component } from 'react'
import { View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Card, CardItem, Body, Container } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import CheckAlert from "react-native-awesome-alert"
import { URL_API, URL_API_TIENDA } from '../constantes/urlApi'
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import { Calendar, LocaleConfig, CalendarList } from 'react-native-calendars';
import moment from 'moment';
import DatosTablas from './datosTablas'
import { withTheme, ListItem, Text, Button } from 'react-native-elements';
import {StyleSheet,TouchableOpacity} from 'react-native';


var diasReservados = {}
var date = moment().format("YYYY-DD-MM");

let dots = []

var daySelected = '1'

class MiCalendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiendas: null,
      reservados: null,
      detalleReservados: null,
      id: this.props.idUsuario
    }
  }
  cancelarTurno = () => {
    this.props.navigation.navigate('Turnos')
  }


  static navigationOptions = {
    title: 'Mis turnos',
    headerStyle: {
      backgroundColor: '#FFFFFF',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: 'rgb(4, 116, 186)',
    headerTitleStyle: {
      fontWeight: 'normal',
      fontFamily: 'Nunito',
      color: 'rgb(4, 116, 186)'
    },
  };

  async componentDidMount() {
    const { id } = this.state
    await fetch(URL_API + '/api/turno/consultarTurnosCliente/' + id)
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        dots = []
        myJson.forEach((json, i) => {
          switch (json.nombreTienda) {
            case 'Disco':
              const discoDot = { key: json.nombreTienda + ' - ' + json.idTurno, color: '#FF554D', selectedDotColor: '#FF554D' }
              dots.push(discoDot)
              break;
            case 'Jumbo':
              const jumboDot = { key: json.nombreTienda + ' - ' + json.idTurno, color: '#48C774', selectedDotColor: '#48C774' }
              dots.push(jumboDot)
              break;
            case 'Easy':
              const easyDot = { key: json.nombreTienda + ' - ' + json.idTurno, color: 'orange', selectedDotColor: 'orange' }
              dots.push(easyDot)
              break;
            default:
              const defaultDot = { key: 'unknown', color: 'black', selectedDotColor: 'black' }
              dots.push(defaultDot)
              break;
          }
          diasReservados[json.fechaProgramado] = { dots: dots, marked: true, selectedColor: "blue" }
          if (i < myJson.length && i != myJson.length - 1) {
            if ((myJson[i + 1].fechaProgramado != json.fechaProgramado)) {
              dots = []
            }
          } else {

          }
        })
        this.setState({
          reservados: diasReservados,
          tiendas: myJson
        })
        diasReservados = {}

      }.bind(this))
  }
  
  detalleTurnoPorFecha = async (day) => {
    const { id } = this.state
    const dia = day.dateString;
    const url = URL_API + '/api/turno/consultarTurnos/' + id + '/' + dia
    await fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        if (myJson.lenght != 0) {
          this.setState({
            detalleReservados: myJson,
          })
        }
      }.bind(this))
  }

  showDateString = (date) => {
    var today = moment().format("YYYY-MM-DD")
    var formattedDate = date.year + '-' + ("0" + date.month).slice(-2)  + '-' + ("0" + date.day).slice(-2)
    var finalDate = moment(formattedDate).format("YYYY-MM-DD")

    if (moment(today).isSame(finalDate)) {
      return (
        <View style={{  }}>
          <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Hoy</Text>
        </View>
      )
    }
    if (moment(today).isBefore(finalDate) && (moment(today).day() === (moment(finalDate).day() - 1))) {
      return (
        <View style={{  }}>
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
            <View style={{  }}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Domingo</Text>
            </View>
          )
        case 1:
          return (
            <View style={{  }}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Lunes</Text>
            </View>
          )
        case 2:
          return (
            <View style={{  }}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Martes</Text>
            </View>
          )
        case 3:
          return (
            <View style={{  }}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Miércoles</Text>
            </View>
          )
        case 4:
          return (
            <View style={{  }}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Jueves</Text>
            </View>
          )
        case 5:
          return (
            <View style={{  }}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Viernes</Text>
            </View>
          )
        case 6:
          return (
            <View style={{  }}>
              <Text style={{ fontSize: 30, marginLeft: 15, fontFamily: 'Nunito_bold' }}>Sabado</Text>
            </View>
          )
        default:
          break;
      }
    }
  }

  render() {
    const { tiendas, reservados, detalleReservados } = this.state
    const { theme, updateTheme, replaceTheme } = this.props;

    if (tiendas != null && detalleReservados == null) {
      return (
        
        <React.Fragment>
          
          <CalendarList
            horizontal={true}
            markedDates={reservados}
            markingType={'multi-dot'}
            selected={{ date }}
            marked={{ date }}
            minDate={{ date }}
            theme={{
              textDayFontFamily: 'Nunito',
              textMonthFontFamily: 'Nunito',
              textDayHeaderFontFamily: 'Nunito',
              selectedDayBackgroundColor: 'red'
            }}
            onDayPress={(day) => {
              return (
                daySelected = day,
                this.detalleTurnoPorFecha(day)
              )
            }}
          />
          
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontFamily: 'Nunito' }}>Selecciona una fecha para comenzar</Text>
          </View>
          

        </React.Fragment>
        
      )
    } else if (detalleReservados != null && detalleReservados.length > 0) {
      return (
        
        <React.Fragment>
          <CalendarList
            horizontal={true}
            markedDates={reservados}
            markingType={'multi-dot'}
            selected={{ date }}
            marked={{ date }}
            minDate={{ date }}
            theme={{
              textDayFontFamily: 'Nunito',
              textMonthFontFamily: 'Nunito',
              textDayHeaderFontFamily: 'Nunito',
              selectedDayBackgroundColor: 'red'
            }}
            onDayPress={(day) => {
              return (
                daySelected = day,
                this.detalleTurnoPorFecha(day)
              )
            }
            }
          />
          <ScrollView style={{ backgroundColor: 'white' }}>
            <Container style={{ flex: 1, height: 40, flexDirection: 'row' }}>
              {
                this.showDateString(daySelected)
              }
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, marginRight: 15, marginTop: 15, fontFamily: 'Nunito', alignSelf: 'flex-end' }}>{daySelected.day + '/' + daySelected.month + '/' + daySelected.year}</Text>
              </View>
            </Container>
            {
              detalleReservados.map((turno, i) => (
                <DatosTablas data={turno} cancelar={this.cancelarTurno} key={turno.idTurno}></DatosTablas>
              ))
            }
          </ScrollView>
          <ListItem
              Component={TouchableScale}
              containerStyle={{  }}
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
    } else if (detalleReservados != null && detalleReservados.length == 0) {
      return (
        <React.Fragment>
          <CalendarList
            horizontal={true}
            markedDates={reservados}
            markingType={'multi-dot'}
            selected={{ date }}
            minDate={{ date }}
            theme={{
              textDayFontFamily: 'Nunito',
              textMonthFontFamily: 'Nunito',
              textDayHeaderFontFamily: 'Nunito',
            }}
            onDayPress={(day) => {
              return (
                daySelected = day,
                this.detalleTurnoPorFecha(day)
              )
            }
            }
          />
          <View style={{ justifyContent: 'center' }}>
          <Text style={{ marginTop: 15, fontSize: 20, alignSelf: 'center', fontFamily: 'Nunito', marginBottom: 10 }}>{'No existen turnos para el ' + daySelected.day + '/' + daySelected.month + '/' + daySelected.year }</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <ListItem
              Component={TouchableScale}
              containerStyle={{  }}
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
          </View>
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
  };
}

const mapStateToProps = state => {
  return {
    idUsuario: state.user.idUsuario,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MiCalendario))