import React, { Component } from 'react'
import DatosTablas from './datosTablas'

import styles from '../../../../App.scss'

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
          <Text style={ styles.text }>{'No existen turnos para este día'}</Text>
        </React.Fragment>
      )
    }
  }
}


export default withTheme(MostrarMisTurnos)