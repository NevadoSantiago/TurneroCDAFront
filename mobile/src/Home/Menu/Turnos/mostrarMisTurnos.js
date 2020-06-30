import React, { Component } from 'react'
import { View, ScrollView, Container } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import DatosTablas from './datosTablas'
import moment from 'moment';

import { withTheme, ListItem, Text } from 'react-native-elements';

class MostrarMisTurnos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucursales: null,
      id: this.props.idUsuario
    }
  }

  cancelarTurnos = () => {

  }

  render() {
    const { turnos, daySelected } = this.props
    const { theme, updateTheme, replaceTheme } = this.props;
    //console.log(turnos)
    if (turnos.length > 0) {
      return (
        turnos.map((turno, i) => (
          <DatosTablas data={turno} cancelar={this.cancelarTurno} key={turno.idTurno}></DatosTablas>
        ))
      )
    }
    else {
      return (
        <React.Fragment>
          <Text style={{ marginTop: 15, fontSize: 20, alignSelf: 'center', fontFamily: 'Nunito', marginBottom: 10 }}>{'No existen turnos para este día'}</Text>
        </React.Fragment>
      )
    }
  }
}


export default withTheme(MostrarMisTurnos)